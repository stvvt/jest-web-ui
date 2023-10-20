import { type Response, type Request } from 'express';

interface ActiveClient {
  clientId: number;
  response: Response;
}

export default class Transmitter {
  private clients: ActiveClient[] = [];
  private nextClientId = 1;

  public addClient(request: Request, response: Response): void {
    const clientId = this.nextClientId++;
    this.clients.push({
      clientId,
      response
    });

    request.socket.on('close', () => {
      console.log(`${clientId} Connection closed`, this.nextClientId);
      this.clients = this.clients.filter(client => client.clientId !== clientId);
      console.log('Remaining clients:', this.clients.map(({ clientId }) => clientId));
      if (this.clients.length === 0) {
        console.log('All clients down');
      }
    });

    console.log('New client connected', clientId, this.clients.length);
  }

  public transmit(data: any): void {
    console.log(`broadcasting to ${this.clients.length} clients`);
    this.clients.forEach(client => client.response.write(`data: ${data}\n\n`));
  }
}
