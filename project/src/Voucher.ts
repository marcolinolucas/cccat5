export default class Voucher {
	code: string;
	percentage: number;
	
	constructor({ code, percentage }: { code: string; percentage: number }) {
		this.code = code;
		this.percentage = percentage;
	}
}