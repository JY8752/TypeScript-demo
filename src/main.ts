import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { PrismaService } from './service/prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
}
bootstrap();
