import Router from 'koa-router';
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

export default () => router.routes();
