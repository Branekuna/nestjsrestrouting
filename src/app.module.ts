import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { AppController } from './app.controller';
import { routes } from './app.routes';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { logger } from './middleware/logger.middleware';
import { OwnersModule } from './owners/owners.module';

@Module({
  imports: [RouterModule.forRoutes(routes), CatsModule, OwnersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      //.exclude('cats/(.*)')
      .forRoutes(CatsController);
  }
}
