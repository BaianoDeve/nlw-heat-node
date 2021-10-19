import 'dotenv/config';
import { serverHttp, io } from '@/app';

const PORT = 4000 || process.env.PORT;

io.on('connection', (socket) => {
  console.log(`Usuário conectado no socket ${socket.id}`);
});

serverHttp.listen(PORT, () =>
  console.log(`🚀 Server is running on Port ${PORT}`)
);
