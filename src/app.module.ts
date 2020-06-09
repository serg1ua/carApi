import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModule } from './modules/car/car.module';
import { ormConfig } from './ormconfig';
import { ManufacturersModule } from './modules/manufacturer/manufacturer.module';
import { OwnerModule } from './modules/owner/owner.module';
import { CronService } from './modules/cron/cron.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(ormConfig),
    CarModule,
    ManufacturersModule,
    OwnerModule,
  ],
  providers: [CronService],
})
export class AppModule {}
