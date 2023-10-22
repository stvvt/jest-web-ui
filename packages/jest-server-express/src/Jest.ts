import { spawn } from 'child_process';

type SpawnParameters = Parameters<typeof spawn>;

class Jest {
  public executeJest(jestArgs: SpawnParameters[1] = [], options: SpawnParameters[2]) {
    const finalArgs = [
      '-s',
      'jest',
      ...jestArgs
    ];

    console.log('starting jest ...');
    const p = spawn('yarn', finalArgs, {
      ...options,
      stdio: ['ignore', 'pipe', 'pipe']
    });

    console.log('jest started.');

    p.stderr.pipe(process.stderr);

    return p;
  }
}

export default Jest;
