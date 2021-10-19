import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { router } from '@/routes';

const app = express();

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: '*',
  },
});

app.use(express.json());
app.use(cors());
app.use(router);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof Error) {
      return response
        .status(400)
        .json({ message: error.message || 'Unexpected error' });
    }

    return response.status(500).json(error);
  }
);

export { serverHttp, io };
