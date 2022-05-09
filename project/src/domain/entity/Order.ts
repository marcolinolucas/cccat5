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

	constructor({ cpf, issueDate = new Date() }: { cpf: string; issueDate?: Date; }) {
		this.cpf = new Cpf(cpf);
		this.issueDate = issueDate;
		this.orderItems = [];
		this.freight = new Freight();
	}

	addProduct({ product, amount }: { product: Product, amount: number }) {
		const orderItem = new OrderItem({ item: product, amount });
		this.orderItems.push(orderItem);
		this.freight.addItem({
			volume: product.getVolume(),
			density: product.getDensity(),
			amount,
		})
	}

	addVoucher({ voucher }: { voucher: Voucher }) {
		if (!this.voucher && !voucher.isExpired({ date: this.issueDate })) {
			this.voucher = voucher;
		}
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