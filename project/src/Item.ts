export default class Item {
	description: string;
	price: number;

	constructor({
		description,
		price,
	}: {
		description: string;
		price: number;
	}) {
		this.description = description;
		this.price = price;
	}
}