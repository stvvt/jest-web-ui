import { RouteHandlers } from '@stv/jest-server-express';

export default RouteHandlers.listTestsHandlerFactory(process.env.ROOT);
