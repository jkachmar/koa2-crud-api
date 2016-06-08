import compose from 'koa-compose';

// Import all routes
import event from './event';
import sensor from './sensor';

export default () => compose([
  event(),
  sensor(),
]);
