import { RouteHandlers } from '@stv/jest-sse-server';
import transmitter from '../../sse-server/transmitter';

export default RouteHandlers.startHandlerFactory(transmitter, process.env.ROOT);
