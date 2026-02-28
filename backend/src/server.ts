import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import connectDB from './config/db';

const PORT = process.env.PORT || 56000;

async function start() {
  try {
    const uri = process.env.MONGO_URI;
    if (uri) {
      await connectDB(uri);
    } else {
      console.warn('MONGO_URI not set — skipping DB connection (development only)');
    }

    let currentPort = Number(PORT);
    const maxAttempts = 10;
    for (let i = 0; i < maxAttempts; i++) {
      try {
        await new Promise<void>((resolve, reject) => {
          const server = app.listen(currentPort, () => {
            console.log(`Server listening on port ${currentPort}`);
            resolve();
          });
          server.on('error', (err: any) => reject(err));
        });
        return; // started successfully
      } catch (err: any) {
        if (err && err.code === 'EADDRINUSE') {
          console.warn(`Port ${currentPort} in use, trying ${currentPort + 1}...`);
          currentPort += 1;
          continue;
        }
        throw err;
      }
    }
    throw new Error('Unable to bind to any port');
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
