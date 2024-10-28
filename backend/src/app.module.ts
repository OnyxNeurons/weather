import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    EventsModule,
    ServeStaticModule.forRoot({
      rootPath: '/frontend', 
      serveRoot: '/frontend', 
    }),
  ],
})
export class AppModule {}
