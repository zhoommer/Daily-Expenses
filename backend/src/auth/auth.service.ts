/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import { JwtPayload, Tokens } from './types';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from './dto/signin.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: AuthDto): Promise<Tokens> {
    const hash = await argon.hash(dto.password);
    const is_user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    const user = await this.prisma.user
      .create({
        data: {
          email: dto.email,
          hash,
        },
      })
      .catch((error) => {
        if (dto.email == is_user.email) {
          throw new ForbiddenException({
            message: 'This email address is already use!',
            data: [],
          });
        }
        throw error;
      });

    const userDetail = await this.prisma.userDetail
      .create({
        data: {
          name: dto.name,
          lastname: dto.lastname,
          email: dto.email,
          mobile: dto.mobile,
          active: true,
          userId: user.id,
        },
      })
      .catch((err) => {
        throw new ForbiddenException({
          message: 'Something went wrong!' + err,
          data: [],
        });
      });
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async signin(dto: SigninDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user)
      throw new ForbiddenException({
        message: 'No users registered with this email address!',
        data: [],
      });

    const passwordMatches = await argon.verify(user.hash, dto.password);
    if (!passwordMatches)
      throw new ForbiddenException({
        message: 'Your password is wrong!',
        data: [],
      });

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: number): Promise<boolean> {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
    return true;
  }

  async refreshTokens(userId: number, rt: string): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');

    const rtMatches = await argon.verify(user.hashedRt, rt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async updateRtHash(userId: number, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException({
        message: 'No users registered with this email address!',
        data: [],
      });
    }
    const payload = {
      email: user.email,
      id: user.id,
    };

    const token = this.getTokens(payload.id, payload.email);
    const forgotPasswordLink = `http://localhost:3000/reset-password/${
      user.id
    }/${(await token).access_token}`;

    return {
      message: 'Password renewal link has been sent to your e-mail address',
      data: forgotPasswordLink,
    };
  }

  async resetPassword(id: number, token: string, dto: ResetPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: parseInt(`${id}`),
      },
    });

    if (parseInt(`${id}`) !== user?.id) {
      throw new ForbiddenException({
        message: 'Gecersiz id!',
        data: [],
      });
    }

    try {
      const new_user = await this.prisma.user.update({
        where: {
          id: parseInt(`${id}`),
        },
        data: {
          hash: await argon.hash(dto.password),
        },
      });

      return {
        message: 'Your Password Has Been Successfully Changed',
        data: new_user,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
