import Order from "../entity/Order";

export interface IOrderRepository {
	saveOrder({ order }: { order: Order }): void;
}