import { type Handler } from 'express';
import type Transmitter from '../transmitter';
import JSONStream from 'jsonstream';
import Jest from '../Jest';

const startHandlerFactory: (transmitter: Transmitter, cwd?: string) => Handler = (transmitter, cwd) => (request, response,) => {
  const jest = new Jest();
  const jestProcess = jest.executeJest(
    [
      '--reporters',
      process.cwd() + '/reporter.js',
      '--maxWorkers',
      '2',
    ], {
      cwd
    }
  );

  jestProcess.stdout.pipe(JSONStream.parse(undefined)).on('data', (data) => {
    transmitter.transmit(JSON.stringify(data));
  });

  response.json({ status: 'OK' });
  response.status(200);
};

export default startHandlerFactory;
