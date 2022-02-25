import {Service} from 'typedi';
import {PrismaClient, User} from '@prisma/client';
import * as requestTypes from './user.parameters';
import {errors} from '../../errors';

const prisma = new PrismaClient();

@Service()
export class UserModel {
  async createOneUser(
      param: requestTypes.CreateOneUserRequest,
  ) {
    const user: User | null = await prisma.user.create({
      data: {
        authLevel: param.bodyAuthLevel,
        email: param.bodyEmail,
        password: param.bodyPassword,
        phone: param.bodyPhone,
        userStatus: param.bodyUserStatus,
        username: param.bodyUsername,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return user;
  }
  async loginUser(
      param: requestTypes.LoginUserRequest,
  ) {
    // custom begin loginUser
    const user: any | null = await prisma.user.findUnique({
      where: {
        email: param.bodyEmail,
      },
      select: {
        id: true,
        password: true,
        email: true,
        userStatus: true,
        auth: {
          select: {
            role: true,
          },
        },
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return user;

    // custom end loginUser
  }
  async logoutUser(
      param: requestTypes.LogoutUserRequest,
  ) {
    // custom begin logoutUser

    // custom end logoutUser
  }
  async deleteOneUser(
      param: requestTypes.DeleteOneUserRequest,
  ) {
    const user: User | null = await prisma.user.delete({
      where: {
        id: param.pathId,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return user;
  }
  async readOneUser(
      param: requestTypes.ReadOneUserRequest,
  ) {
    const user: any | null = await prisma.user.findUnique({
      where: {
        id: param.pathId,
      },
      select: {
        createdAt: true,
        email: true,
        id: true,
        phone: true,
        updatedAt: true,
        username: true,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });

    if (user === null) {
      throw new errors.NotFindError;
    }
    return user;
  }
  async updateOneUser(
      param: requestTypes.UpdateOneUserRequest,
  ) {
    const user: User | null = await prisma.user.update({
      where: {
        id: param.pathId,
      },
      data: {
        authLevel: param.bodyAuthLevel,
        email: param.bodyEmail,
        password: param.bodyPassword,
        phone: param.bodyPhone,
        userStatus: param.bodyUserStatus,
        username: param.bodyUsername,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return user;
  }
  async createManyUsers(
      param: requestTypes.CreateManyUsersRequest[],
  ) {
    const data = param.map((e) => {
      return {
        authLevel: e.bodyAuthLevel,
        email: e.bodyEmail,
        password: e.bodyPassword,
        phone: e.bodyPhone,
        userStatus: e.bodyUserStatus,
        username: e.bodyUsername,
      };
    });

    const res: any = await prisma.user.createMany({
      data,
      skipDuplicates: true,
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res.count;
  }
}
