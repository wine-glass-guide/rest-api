import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import http from 'http';
import { Server } from 'socket.io';
import compression from 'compression';
import Ddos from 'ddos';
import connection from './database/connection.js';
import verifyToken from './middleware/verify-token.js';
import auth from './routes/auth.js';
import grapes from './routes/grapes.js';
import wineGlasses from './routes/wine-glasses.js';
import mails from './routes/mails.js';
import users from './routes/users.js';
import messages from './routes/messages.js';
import images from './routes/images.js';
import { notFound } from './middleware/error.js';
import { corsOptions, ioCorsOptions } from './config/cors-config.js';
import { ddosConfig } from './config/ddos-config.js';
import { jsonOptions, urlEncodedOptions } from './config/express-config.js';

dotenv.config();
connection();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: ioCorsOptions });
const ddos = new Ddos(ddosConfig);

app.use((req, res, next) => {
  req.io = io;
  return next();
});
app.use(ddos.express);
app.use(cors(corsOptions));
app.use(compression());
app.use(helmet());
app.use(express.urlencoded(urlEncodedOptions));
app.use(express.json(jsonOptions));
app.use('/api/auth', auth);
app.use('/api/mails', mails);
app.use('/api/images', images);
app.use('/api/messages', verifyToken, messages);
app.use('/api/users', verifyToken, users);
app.use('/api/grapes', grapes);
app.use('/api/wineglasses', wineGlasses);
app.use(notFound);

server.listen(+process.env.PORT);
