import { type Handler } from 'express';
import Jest from '../Jest';

const listTestsHandlerFactory: (cwd?: string) => Handler = (cwd) => (request, response,) => {
  const jest = new Jest();
  const jestProcess = jest.executeJest([
    '--json',
    '--listTests'
  ], {
    cwd
  });

  jestProcess.stdout.pipe(response).on('close', () => response.status(200));
};

export default listTestsHandlerFactory;
