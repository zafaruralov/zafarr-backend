import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  app.enableCors({ origin: ['https://k8s.zafarr.info', 'https://zafarr.info', 'http://localhost:3000'] });
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
