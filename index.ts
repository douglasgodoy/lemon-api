import cluster from 'cluster';
import * as os from 'os';
import dotenv from 'dotenv';
import { startApp } from 'src/server';

dotenv.config();

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);

  const numCPUs = os.cpus().length / 2;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });
} else {
  startApp();
}
