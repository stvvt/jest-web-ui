import { RouteHandlers } from '@stv/jest-sse-server';

export default RouteHandlers.inspectHandlerFactory(process.env.ROOT);
