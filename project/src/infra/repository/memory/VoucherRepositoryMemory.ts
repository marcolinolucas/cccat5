import Voucher from "../../../domain/entity/Voucher";
import { IVoucherRepository } from "../../../domain/repository/VoucherRepository";

export class VoucherRepositoryMemory implements IVoucherRepository {
	vouchers: Voucher[];
	
	constructor() {
		this.vouchers = [
			new Voucher({ code: 'VALE10', percentage: 10 }),
			new Voucher({ code: 'VALE20', percentage: 20 }),
			new Voucher({ code: 'VALE30', percentage: 30 }),
		]
	}

	getVoucherByCode({ code }: { code: string; }): Voucher | undefined {
		return this.vouchers.find(voucher => voucher.code === code);
	}
}