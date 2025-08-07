import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    app.enableCors({
        origin: [
            'http://localhost:3000',
            // 'http://frontend:3000',
            'http://localhost:5002'
        ],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: 'Content-Type,Authorization,Accept',
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 204,
        maxAge: 86400
    });

    await app.listen(3000);
}
bootstrap();
