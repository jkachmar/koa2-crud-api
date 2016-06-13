import Router from 'koa-router';
import Errors from 'boom';
import compose from 'koa-compose';

import * as Ctrl from '../controllers/sensor';

// Instantiates router for `/sensors` route
const router = new Router({
  prefix: '/sensors',
});

// Binds controller functions to specific routes and HTTP methods
router.get('/', Ctrl.getAllSensors);
router.post('/', Ctrl.addSensor);
router.put('/:uuid/location', Ctrl.updateLocation);

// Boilerplate for easier error handling with `boom`
const routes = router.routes();
const allowedMethods = router.allowedMethods({
  throw: true,
  notImplemented: () => new Errors.notImplemented(),
  methodNotAllowed: () => new Errors.methodNotAllowed(),
});

export default () => compose([
  routes,
  allowedMethods,
]);
