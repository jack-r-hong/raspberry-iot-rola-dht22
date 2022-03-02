import {Service} from 'typedi';
import {PrismaClient, Dht22} from '@prisma/client';
import * as requestTypes from './robot.parameters';
import {errors} from '../../errors';

const prisma = new PrismaClient();

@Service()
export class RobotModel {
  async readManyDHTData(
      param: requestTypes.ReadManyDHTDataRequest,
  ) {
    const result: Dht22[] | null = await prisma.dht22.findMany({
      // where: {
      //   id: param.pathId,
      // },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });

    if (result === null) {
      throw new errors.NotFindError;
    }
    return result;
  }

  async readOneDHTData(
      param: requestTypes.ReadOneDHTDataRequest,
  ) {
    const result: Dht22 | null = await prisma.dht22.findUnique({
      where: {
        id: param.pathId,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });

    if (result === null) {
      throw new errors.NotFindError;
    }
    return result;
  }
  async createOneDHTData(
      param: requestTypes.CreateOneDHTDataRequest,
  ) {
    const result: Dht22 | null = await prisma.dht22.create({
      data: {
        humi: param.bodyHumi,
        temp: param.bodyTemp,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return result;
  }
}
