import compose from 'koa-compose';
import Errors from 'boom';
import Router from 'koa-router';

// Import all routes
import event from './event';
import sensor from './sensor';

// Instantiates router for `/` route
const router = new Router({
  prefix: '/',
});

// Handle unimplemented and not allowed methods with boom
const allowedMethods = router.allowedMethods({
  throw: true,
  notImplemented: () => new Errors.notImplemented(),
  methodNotAllowed: () => new Errors.methodNotAllowed(),
});

export default () => compose([
  event(),
  sensor(),
  allowedMethods,
]);
