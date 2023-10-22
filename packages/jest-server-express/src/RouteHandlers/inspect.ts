import { type Handler } from 'express';
import Jest from '../Jest';

const inspectHandlerFactory: (cwd?: string) => Handler = (cwd) => (request, response,) => {
  const jest = new Jest();
  const jestProcess = jest.executeJest([
    '--json',
    '--testNamePattern',
    'adafafsaf',
  ], {
    cwd
  });

  jestProcess.stdout.pipe(response).on('close', () => response.status(200));
};

export default inspectHandlerFactory;
