import Cpf from "./Cpf";
import Item from "./Item";
import OrderItem from "./OrderItem";
import Voucher from "./Voucher";

export default class Order {
	cpf: Cpf;
	orderItems: OrderItem[];
	voucher?: Voucher;

	constructor({
		cpf,
		voucher
	}: {
		cpf: string;
		voucher?: Voucher;
	}) {
		this.cpf = new Cpf(cpf);
		this.orderItems = [];
		this.voucher = voucher;
	}

	addItem({ item, amount }: { item: Item, amount: number }) {
		const orderItem = new OrderItem({ item, amount });
		this.orderItems.push(orderItem);
	}

	getTotalValue() {
		const totalValue = this.orderItems.reduce((totalValue, item) => {
			return totalValue + item.getTotal();
		}, 0)

		if (!this.voucher) return totalValue;

		return totalValue - (totalValue * (this.voucher.percentage / 100));
	}
}