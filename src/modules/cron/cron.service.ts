import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OwnerService } from '../owner/owner.service';

@Injectable()
export class CronService {
  constructor(private ownerService: OwnerService) {}
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async runEveryDay(): Promise<any> {
    await this.ownerService.removeOwners();
  }
}
