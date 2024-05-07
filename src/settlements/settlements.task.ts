import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from '@nestjs/schedule';
import { SettlementsService } from "./settlements.service";

@Injectable()
export class SettlementsTask {
    constructor(private settlementsService: SettlementsService) { }
    
    @Cron('0 0 0 * * *', {
        timeZone: 'Asia/Seoul'
    })
    async handleCron() {
        const settlements = await this.settlementsService.calculateSettlements();
        console.log(settlements);
    }
}