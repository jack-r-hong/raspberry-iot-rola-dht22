// eslint-disable-next-line no-unused-vars
import {Schema, CustomValidator} from 'express-validator';
import * as sessions from '../../sessions';
// custom begin import

// custom end import

export const readOneDHTDataValidator: Schema = {
  id: {
    in: 'params',
    isInt: true,
    notEmpty: true,
  },
};
export const createOneDHTDataValidator: Schema = {
  id: {
    in: 'params',
    isInt: true,
    notEmpty: true,
  },
  humi: {
    in: 'body',
    isInt: true,
  },
  temp: {
    in: 'body',
    isInt: true,
  },
  yAxios: {
    in: 'body',
    isInt: true,
  },
};
