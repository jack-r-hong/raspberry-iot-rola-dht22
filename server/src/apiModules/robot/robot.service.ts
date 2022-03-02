import {Service} from 'typedi';
export {Container} from 'typedi';
import {RobotModel} from './robot.model';
import * as requestTypes from './robot.parameters';
import {errors} from '../../errors';
// custom begin import

// custom end import


@Service()
export class RobotService {
  constructor(
        private robotModel: RobotModel,
  ) {}

  async readManyDHTData(
      param :requestTypes.ReadManyDHTDataRequest,
  ) {
    const res = await this.robotModel.readManyDHTData(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
  async readOneDHTData(
      param :requestTypes.ReadOneDHTDataRequest,
  ) {
    const res = await this.robotModel.readOneDHTData(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
  async createOneDHTData(
      param :requestTypes.CreateOneDHTDataRequest,
  ) {
    const res = await this.robotModel.createOneDHTData(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
}

