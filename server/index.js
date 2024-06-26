import express from 'express';
import 'dotenv/config';
import connectMongoose from './utils/connectMongoose.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routes/userRouter.js';
import multer from 'multer';
import boardRouter from './routes/boardRouter.js';
import { Server as socketIo } from 'socket.io';
import http from 'http';
import { socketFunc } from './socket/socket.js';

const upload = multer();
const PORT = process.env.PORT || 3000;
const BDConnect = connectMongoose();

const app = express();

const server = http.createServer(app);

const io = new socketIo(server, {
  cors: {
    origin: [process.env.CLIENT_DOMAIN],
    methods: ['GET', 'POST'],
  },
});

app.use(
  cors({
    origin: [process.env.CLIENT_DOMAIN],
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(upload.array());

app.get('/', (req, res) => res.send('server is running'));
app.use('/', userRouter);
app.use('/', boardRouter);

if (await BDConnect) {
  console.log('MongoDB Connect');
}

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
socketFunc(io);
