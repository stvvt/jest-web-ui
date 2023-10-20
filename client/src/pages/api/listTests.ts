import { RouteHandlers } from '@stv/jest-sse-server';

export default RouteHandlers.listTestsHandlerFactory(process.env.ROOT);
