import Router from 'koa-router';
import Errors from 'boom';
import compose from 'koa-compose';

import * as Ctrl from '../controllers/event';

const router = new Router({
  prefix: '/events',
});

router.get('/', Ctrl.getAllEvents);
router.get('/:id', Ctrl.getSensorEvents);

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
