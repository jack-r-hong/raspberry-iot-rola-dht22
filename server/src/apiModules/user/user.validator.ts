// eslint-disable-next-line no-unused-vars
import {Schema, CustomValidator} from 'express-validator';
import * as sessions from '../../sessions';
// custom begin import

// custom end import
export const createOneUserValidator: Schema = {
  authLevel: {
    in: 'body',
    isInt: true,
  },
  email: {
    in: 'body',
    isEmail: true,
  },
  password: {
    in: 'body',
    isStrongPassword: true,
    isLength: {
      options: {
        max: 30,
        min: 8,
      },

    },
  },
  phone: {
    in: 'body',
    optional: {
      options: {
        nullable: true,
      },
    },
    isMobilePhone: true,
  },
  userStatus: {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  username: {
    in: 'body',
    isLength: {
      options: {
        max: 30,
        min: 3,
      },

    },
  },
  userInfo: {
    in: 'cookies',
    custom: {
      options: (value, {req, location, path}) => {
        sessions.userInfoSessionVerify(req['session'].userInfo);
        return true;
      },
    },
  },
};
export const loginUserValidator: Schema = {
  email: {
    in: 'body',
    isEmail: true,
  },
  password: {
    in: 'body',
    isStrongPassword: true,
    isLength: {
      options: {
        max: 30,
        min: 8,
      },

    },
  },
};
export const logoutUserValidator: Schema = {
};
export const deleteOneUserValidator: Schema = {
  id: {
    in: 'params',
    isInt: true,
    notEmpty: true,
  },
  userInfo: {
    in: 'cookies',
    custom: {
      options: (value, {req, location, path}) => {
        sessions.userInfoSessionVerify(req['session'].userInfo);
        return true;
      },
    },
  },
};
export const readOneUserValidator: Schema = {
  id: {
    in: 'params',
    isInt: true,
    notEmpty: true,
  },
  userInfo: {
    in: 'cookies',
    custom: {
      options: (value, {req, location, path}) => {
        sessions.userInfoSessionVerify(req['session'].userInfo);
        return true;
      },
    },
  },
};
export const updateOneUserValidator: Schema = {
  id: {
    in: 'params',
    isInt: true,
    notEmpty: true,
  },
  authLevel: {
    in: 'body',
    isInt: true,
  },
  email: {
    in: 'body',
    isEmail: true,
  },
  password: {
    in: 'body',
    isStrongPassword: true,
    isLength: {
      options: {
        max: 30,
        min: 8,
      },

    },
  },
  phone: {
    in: 'body',
    optional: {
      options: {
        nullable: true,
      },
    },
    isMobilePhone: true,
  },
  userStatus: {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  username: {
    in: 'body',
    isLength: {
      options: {
        max: 30,
        min: 3,
      },

    },
  },
  userInfo: {
    in: 'cookies',
    custom: {
      options: (value, {req, location, path}) => {
        sessions.userInfoSessionVerify(req['session'].userInfo);
        return true;
      },
    },
  },
};
export const createManyUsersValidator: Schema = {
  userInfo: {
    in: 'cookies',
    custom: {
      options: (value, {req, location, path}) => {
        sessions.userInfoSessionVerify(req['session'].userInfo);
        return true;
      },
    },
  },
};
