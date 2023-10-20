#!/usr/bin/env ts-node

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import startHandlerFactory from './RouteHandlers/start';
import eventsHandler from './RouteHandlers/events';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../public'));

app.get('/events', eventsHandler);
app.get('/start', startHandlerFactory);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Facts Events service listening at http://localhost:${PORT}`);
});

