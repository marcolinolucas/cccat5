import Voucher from "../entity/Voucher";

export interface IVoucherRepository {
	getVoucherByCode({ code }: { code: string }): Voucher | undefined;
}