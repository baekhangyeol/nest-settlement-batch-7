import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum OrderStatus {
    PaymentComplete = "결제완료",
    Shipping = "배송중",
    Delivered = "배송완료",
    PurchaseConfirmed = "구매확정",
    Cancelled = "취소"
}

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sellerId: number;

    @Column('decimal')
    amount: number;

    @Column({
        type: 'enum',
        enum: OrderStatus,
    })
    status: OrderStatus;

    @Column({ nullable: true, type: 'timestamp' })
    confirmedAt?: Date;
}