import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  // app.setGlobalPrefix('api/');
  const todoProxy = createProxyMiddleware({
    target: 'http://todo-service:3001',
    changeOrigin: true,
    pathRewrite: {
      '^/todos': '',
    },
  });

  const personProxy = createProxyMiddleware({
    target: 'http://person-service:3002',
    changeOrigin: true,
    pathRewrite: {
      '^/persons': '',
    }
  });

  app.use('/todos', todoProxy);
  app.use('/persons', personProxy);

  await app.listen(process.env.port ?? 3000);
  console.log(`API Gateway running on: ${await app.getUrl()}`);
}
bootstrap();
