import 'reflect-metadata';
import {ExpressApp} from './expressApp';
const RaspiHandler = require('./raspi/index').RaspiHandler;

new RaspiHandler();
const app = new ExpressApp();
app.listen(4000);
