import { RouteHandlers } from '@stv/jest-server-express';
import transmitter from '../../sse-server/transmitter';

export default RouteHandlers.eventsHandlerFactory(transmitter);
