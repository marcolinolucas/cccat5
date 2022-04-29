import Item from "./Item";

export default class OrderItem {
	item: Item;
	amount: number;

	constructor({ item, amount }: { item: Item; amount: number }) {
		this.item = item;
		this.amount = amount;
	}

	getTotal() {
		return this.item.price * this.amount;
	}
}