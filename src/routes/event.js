import Router from 'koa-router';
import Errors from 'boom';
import compose from 'koa-compose';

import * as Ctrl from '../controllers/event';

// Instantiates router for `/events` route
const router = new Router({
  prefix: '/events',
});

// Binds controller functions to specific routes and HTTP methods
router.get('/', Ctrl.getAllEvents);
router.get('/:uuid', Ctrl.getSensorEvents);

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
