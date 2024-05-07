import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order, OrderStatus } from "src/orders/order.entity";
import { Raw, Repository } from "typeorm";

@Injectable()
export class SettlementsService {
    private readonly commissionRate = 0.05;

    constructor(@InjectRepository(Order) private orderRepository: Repository<Order>) {}

    async calculateSettlements(): Promise<{ [sellerId: number]: number }> {
        const orders = await this.orderRepository.find({
            where: [
                { status: OrderStatus.PurchaseConfirmed },
                { 
                    status: OrderStatus.Delivered, 
                    confirmedAt: Raw(alias => `DATE_ADD(${alias}, INTERVAL 5 DAY) <= NOW()`)
                }
            ]
        });

        const settlements = {};

        orders.forEach(order => {
            const netAmount = order.amount * (1 - this.commissionRate);
            if (settlements[order.sellerId]) {
                settlements[order.sellerId] += netAmount;
            } else {
                settlements[order.sellerId] = netAmount;
            }
        });

        return settlements;
    }
}
