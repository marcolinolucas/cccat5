import Cpf from "./Cpf";
import Product from "./Product";
import OrderItem from "./OrderItem";
import Voucher from "./Voucher";
import Freight from "./Freight";

export default class Order {
	cpf: Cpf;
	orderItems: OrderItem[];
	voucher?: Voucher;
	issueDate: Date;
	freight: Freight;

	constructor({
		cpf,
		issueDate = new Date(),
		voucher,
	}: {
		cpf: string;
		issueDate?: Date,
		voucher?: Voucher;
	}) {
		this.cpf = new Cpf(cpf);
		this.issueDate = issueDate;
		this.orderItems = [];
		this.freight = new Freight();
		if (voucher && voucher.isExpired({ date: issueDate })) throw new Error('Invalid voucher');
		this.voucher = voucher;
	}

	addItem({ item, amount }: { item: Product, amount: number }) {
		const orderItem = new OrderItem({ item, amount });
		this.orderItems.push(orderItem);
		this.freight.addItem({
			volume: item.getVolume(),
			density: item.getDensity(),
			amount,
		})
	}

	getTotalValue() {
		const totalValue = this.orderItems.reduce((totalValue, item) => {
			return totalValue + item.getTotal();
		}, 0)
		if (!this.voucher) return totalValue + this.getFreightValue();
		const totalValueWithVoucher = totalValue - this.voucher.getDiscount({ amount: totalValue });
		return totalValueWithVoucher + this.getFreightValue();
	}

	getFreightValue() {
		return this.freight.getTotal();
	}
}