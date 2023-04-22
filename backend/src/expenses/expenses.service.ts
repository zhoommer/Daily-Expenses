import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExpensesDto } from './dtos/createExpenses.dto';
import { UpdateExpensesDto } from './dtos/updateExpenses.dto';

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  async getUsers(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    return {
      data: user,
    };
  }

  async getUserDetail(userId: number) {
    const user = await this.prisma.userDetail.findMany({
      where: {
        userId: userId,
      },
    });

    return {
      message: 'Data Listed.',
      data: user,
    };
  }

  async addExpenses(userId: number, dto: CreateExpensesDto) {
    const expenses = await this.prisma.expenses.create({
      data: {
        isim: dto.isim,
        tutar: dto.tutar,
        tarih: dto.tarih,
        kategori: dto.kategori,
        userId: userId,
      },
    });

    if (!expenses) throw new ForbiddenException('Beklenmeyen bir hata olustu!');

    return {
      message: 'Kayit Olusturuldu.',
      data: expenses,
    };
  }

  async getList(userId: number) {
    const expenses = await this.prisma.expenses.findMany({
      where: { userId: userId },
    });

    const pageSize = Math.round(expenses.length / 9);

    const page = await this.prisma.expenses.findMany({
      take: 9,
      where: {
        userId: userId,
      },
      orderBy: {
        tarih: 'desc',
      },
    });

    return {
      data: page,
      pageSize: pageSize,
    };
  }

  async getExpenses(userId: number, page: number) {
    const expenses = await this.prisma.expenses.findMany({
      where: { userId: userId },
    });
    const pageSize = Math.round(expenses.length / 9);

    const page1 = await this.prisma.expenses.findMany({
      take: 9,
      where: {
        userId: userId,
      },
      orderBy: {
        tarih: 'desc',
      },
    });

    const lastPostInResult = page1[8];
    const myCursor = lastPostInResult.id;

    const page2 = await this.prisma.expenses.findMany({
      take: 9,
      skip: 1,
      cursor: {
        id: myCursor,
      },
      where: {
        userId: userId,
      },
      orderBy: {
        tarih: 'desc',
      },
    });

    const cursor3 = page2[8].id;
    const page3 = await this.prisma.expenses.findMany({
      take: 9,
      skip: 1,
      cursor: { id: cursor3 },
      where: { userId: userId },
      orderBy: { tarih: 'desc' },
    });

    const cursor4 = page3[8].id;
    const page4 = await this.prisma.expenses.findMany({
      take: 9,
      skip: 1,
      cursor: { id: cursor4 },
      where: { userId: userId },
      orderBy: { tarih: 'desc' },
    });
    if (!page) {
      return {
        data: page1,
        pageSize: pageSize,
      };
    }
    if (page === 1) {
      return {
        data: page1,
        pageSize: pageSize,
      };
    }
    if (page === 2) {
      return {
        data: page2,
        pageSize: pageSize,
      };
    }
    if (page === 3) {
      return { data: page3, pageSize: pageSize };
    }
    if (page === 4) {
      return { data: page4, pageSize: pageSize };
    }
  }

  async getExpensesFilter(userId: number, search: string) {
    const filter_expenses = await this.prisma.expenses.findMany({
      where: {
        userId: userId,
        isim: {
          contains: search,
        },
      },
      orderBy: {
        tarih: 'desc',
      },
    });

    return {
      message: 'Data Listed',
      data: filter_expenses,
    };
  }

  async updateExpenses(userId: number, id: number, dto: UpdateExpensesDto) {
    const expense = await this.prisma.expenses.update({
      where: {
        id: id,
      },
      data: {
        isim: dto.isim,
        tutar: dto.tutar,
        kategori: dto.kategori,
        tarih: dto.tarih,
      },
    });

    if (!expense)
      throw new ForbiddenException({
        message: 'Veri bulunamadi!',
        data: [],
      });

    return {
      message: 'Harcamaniz basarili bir sekilde guncellendi.',
      data: expense,
    };
  }

  async deleteExpenses(userId: number, id: number) {
    const expense = await this.prisma.expenses.delete({
      where: {
        id: id,
      },
    });

    return {
      message: 'Islem basarili',
      data: expense,
    };
  }

  async totalExpense(userId: number) {
    function getUnique(array: any[]) {
      const uniqueArray = [];

      for (const value of array) {
        if (uniqueArray.indexOf(value) === -1) {
          uniqueArray.push(value);
        }
      }
      return uniqueArray;
    }

    const expenses = await this.groupByExpense(userId);
    // const days = (await this.getExpenses(userId)).data;

    const labels = [];
    const data = [];

    expenses.data.map((expense) => {
      labels.push(expense.kategori);
      data.push(expense._sum.tutar);
    });

    return {
      data: {
        labels: labels,
        data: data,
      },
    };
  }

  async groupByExpenses(userId: number) {
    const expenses = await this.prisma.expenses.groupBy({
      by: ['kategori'],
      where: {
        userId: userId,
      },
      _count: {
        kategori: true,
      },
      orderBy: {
        kategori: 'desc',
      },
    });

    return {
      message: 'Veriler Listelendi',
      data: expenses,
    };
  }

  async groupByExpense(userId: number) {
    const result = await this.prisma.expenses.groupBy({
      by: ['kategori'],
      where: {
        userId: userId,
      },
      _sum: {
        tutar: true,
      },
      orderBy: {
        kategori: 'desc',
      },
    });

    return {
      message: 'Kategorilere gore harcamalar',
      data: result,
    };
  }

  async getCategories() {
    const categories = await this.prisma.categories.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return {
      message: 'Data Listed',
      data: categories,
    };
  }
}
