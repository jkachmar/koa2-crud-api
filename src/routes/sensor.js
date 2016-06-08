import Router from 'koa-router';
import Errors from 'boom';
import compose from 'koa-compose';

import * as Ctrl from '../controllers/sensor';

const router = new Router({
  prefix: '/sensors',
});

router.get('/', Ctrl.getAllSensors);
router.post('/', Ctrl.addSensor);
router.put('/:id/location', Ctrl.updateLocation);

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
