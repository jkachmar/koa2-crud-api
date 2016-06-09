import Koa from 'koa';
import debug from 'debug';

import loggerMiddleware from 'koa-bunyan-logger';

import requestMiddleware from './middleware/request';
import errorMiddleware from './middleware/error';

import routeMiddleware from './routes';

import conf from './conf';

const app = new Koa();
const d = debug('koa-app:root');

// Register middleware
app.use(loggerMiddleware());
app.use(requestMiddleware());
app.use(errorMiddleware());

// Registers routes via middleware
app.use(routeMiddleware());

d('current environment: %s', conf.get('env'));
d('server started at port: %d', conf.get('port'));
app.listen(conf.get('port'));

export default app;
