export default class PlaceOrderInput {
	cpf: string;
	items: { id: number; amount: number }[];
	voucherCode?: string;

	constructor({
		cpf,
		items,
		voucherCode,
	}: {
		cpf: string;
		items: { id: number; amount: number }[];
		voucherCode?: string;
	}) {
		this.cpf = cpf;
		this.items = items;
		this.voucherCode = voucherCode;
	}
}