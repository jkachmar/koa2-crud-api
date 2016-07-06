import Router from 'koa-router';
import compose from 'koa-compose';

import * as Ctrl from '../controllers/event';

// Instantiates router for `/events` route
const router = new Router({
  prefix: '/events',
});

// Binds controller functions to specific routes and HTTP methods
router.get('/', Ctrl.getAllEvents);
router.get('/:uuid', Ctrl.getSensorEvents);

export default () => router.routes();
