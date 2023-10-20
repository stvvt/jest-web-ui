import { Transmitter } from '@stv/jest-sse-server';

let transmitter: Transmitter;

if (process.env.NODE_ENV === 'production') {
  transmitter = new Transmitter();
} else {
  if (!(global as any).transmitter) {
    (global as any).transmitter = new Transmitter();
  }
  transmitter = (global as any).transmitter;
}

export default transmitter;
