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

// Socket.IO
const server = http.createServer(app);
const io = new socketIo(server, {
  cors: {
    origin: process.env.NODE_ENV ? 'http://localhost:5173' : 'client domain',
    methods: ['GET', 'POST'],
  },
});

app.use(
  cors({
    origin: process.env.NODE_ENV ? 'http://localhost:5173' : 'client domain',
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(upload.array());

app.use('/', (req, res) => res.send('server is running'));
app.use('/', userRouter);
app.use('/', boardRouter);

if (await BDConnect) {
  console.log('MongoDB Connect');
}

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
socketFunc(io);
