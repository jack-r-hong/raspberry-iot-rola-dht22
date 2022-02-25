import {Application} from 'express';
// import {AuthController} from './auth/auth.controller';
// import {UserController} from './user/user.controller';
import {RobotController} from './robot/robot.controller';

const controllers = [
  // AuthController,
  // UserController,
  RobotController,
];


export const registerController = (app : Application) => {
  controllers.forEach((Controller) =>{
    new Controller(app);
  });
};
