import Product from "./Product";

export default class OrderItem {
	item: Product;
	amount: number;

	constructor({ item, amount }: { item: Product; amount: number }) {
		this.item = item;
		this.amount = amount;
	}

	getTotal() {
		return this.item.price * this.amount;
	}
}