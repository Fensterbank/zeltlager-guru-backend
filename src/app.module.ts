import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { format, transports } from 'winston';
import { WinstonModule } from 'nest-winston';
import typeOrmConfig = require('./config/typeorm.config');
import { AuthModule } from './auth/auth.module';
import { LocationsModule } from './locations/locations.module';
import { CampgroundsModule } from './campground/campgrounds.module';
import { OrganisationsModule } from './organisations/organisations.module';
import { CampsModule } from './camps/camps.module';
import { CampEventsModule } from './campevents/campevents.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig as TypeOrmModuleOptions),
    WinstonModule.forRoot({
      transports: [
        new transports.Console(),
        new transports.File({
          filename: 'log/default.log',
          level: 'info'
        }),
        new transports.File({
          filename: 'log/errors.log',
          level: 'error',
        })
      ],
      format: format.combine(
        format.timestamp(),
        format.printf(i => `${i.timestamp} | ${i.level} | ${i.message}${i.stack ? ` | ${i.stack}` : ''}`),
      ),
    }),
    AuthModule,
    LocationsModule,
    CampgroundsModule,
    OrganisationsModule,
    CampsModule,
    CampEventsModule,
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      autoSchemaFile: 'schema.gql',
    }),
  ],
})
export class AppModule {}
