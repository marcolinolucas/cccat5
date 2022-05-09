import Order from "../../../domain/entity/Order";
import { IOrderRepository } from "../../../domain/repository/OrderRepository";

export class OrderRepositoryMemory implements IOrderRepository {
	orders: Order[];
	
	constructor() {
		this.orders = [];
	}

	saveOrder({ order }: { order: Order; }): void {
		this.orders.push(order);
	}
	
}