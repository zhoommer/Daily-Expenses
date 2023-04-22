/* eslint-disable prettier/prettier */
import { JwtPayload } from '.';

export type JwtPayloadWithRt = JwtPayload & { refreshToken: string };
