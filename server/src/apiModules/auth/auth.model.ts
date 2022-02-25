import {Service} from 'typedi';
import {PrismaClient, Auth} from '@prisma/client';
import * as requestTypes from './auth.parameters';
import {errors} from '../../errors';

const prisma = new PrismaClient();

@Service()
export class AuthModel {
  async createOneAuth(
      param: requestTypes.CreateOneAuthRequest,
  ) {
    const auth: Auth | null = await prisma.auth.create({
      data: {
        level: param.bodyLevel,
        role: param.bodyRole,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return auth;
  }
  async deleteOneAuth(
      param: requestTypes.DeleteOneAuthRequest,
  ) {
    const auth: Auth | null = await prisma.auth.delete({
      where: {
        id: param.pathId,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return auth;
  }
  async updateOneAuth(
      param: requestTypes.UpdateOneAuthRequest,
  ) {
    const auth: Auth | null = await prisma.auth.update({
      where: {
        id: param.pathId,
      },
      data: {
        level: param.bodyLevel,
        role: param.bodyRole,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return auth;
  }
  async readManyAuth(
      param: requestTypes.ReadManyAuthRequest,
  ) {
    const auth: Auth[] | null = await prisma.auth.findMany({
      where: {
      },
      select: {
        id: true,
        level: true,
        role: true,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return auth;
  }
}
