import {Service} from 'typedi';
export {Container} from 'typedi';
import {AuthModel} from './auth.model';
import * as requestTypes from './auth.parameters';
import {errors} from '../../errors';
// custom begin import

// custom end import


@Service()
export class AuthService {
  constructor(
        private authModel: AuthModel,
  ) {}
  async createOneAuth(
      param :requestTypes.CreateOneAuthRequest,
  ) {
    const res = await this.authModel.createOneAuth(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
  async deleteOneAuth(
      param :requestTypes.DeleteOneAuthRequest,
  ) {
    const res = await this.authModel.deleteOneAuth(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
  async updateOneAuth(
      param :requestTypes.UpdateOneAuthRequest,
  ) {
    const res = await this.authModel.updateOneAuth(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
  async readManyAuth(
      param :requestTypes.ReadManyAuthRequest,
  ) {
    const res = await this.authModel.readManyAuth(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
}

