import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './shared/filters/all-exceptions.filter';

// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// let server: Handler;

// async function bootstrapServerlessServer() {
//      const app = await NestFactory.create(AppModule);
//      app.enableCors();
//      const httpAdapter = app.get(HttpAdapterHost);
//      app.useGlobalPipes(new ValidationPipe({ whitelist: true, stopAtFirstError: true }));
//      app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
//      await configureSwagger(app);
//      await app.init();
//      const expressApp = app.getHttpAdapter().getInstance();
//      return ServerlessExpress({ app: expressApp });
// }

// export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
//      server = server ?? (await bootstrapServerlessServer());
//      return server(event, context, callback);
// };

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, stopAtFirstError: true }),
  );
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.enableCors();
  //  await configureSwagger(app);
  await app.listen(3500, () => {
    console.log('server run on port 3500');
  });
}

if (process.env.NODE_ENV == 'dev') {
  bootstrap();
}
