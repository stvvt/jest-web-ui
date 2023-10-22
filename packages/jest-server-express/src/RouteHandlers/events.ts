import { type Handler } from 'express';
import type Transmitter from '../transmitter';

const eventsHandlerFactory: (transmitter: Transmitter) => Handler = (transmitter) => (request, response) => {
  const headers = {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
    'Content-Encoding': 'none',
  };
  response.writeHead(200, headers);
  process.on('SIGTERM', () => { response.end(); });

  transmitter.addClient(request, response);
};

export default eventsHandlerFactory;
