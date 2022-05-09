import Order from "../../domain/entity/Order";
import { IOrderRepository } from "../../domain/repository/OrderRepository";
import { IProductRepository } from "../../domain/repository/ProductRepository";
import { IVoucherRepository } from "../../domain/repository/VoucherRepository";

export default class PlaceOrder {
	private productRepository;
	private voucherRepository;
	private orderRepository;

	constructor(
		productRepository: IProductRepository,
		voucherRepository: IVoucherRepository,
		orderRepository: IOrderRepository,
	) {
		this.productRepository = productRepository;
		this.voucherRepository = voucherRepository;
		this.orderRepository = orderRepository;
	}

	execute({
		cpf,
		items,
		voucherCode,
	}: {
		cpf: string;
		items: { id: number; amount: number }[];
		voucherCode?: string;
	}) {
		const order = new Order({ cpf });
		items.forEach(item => {
			const product = this.productRepository.getProductById({ id: item.id });
			if (!product) throw new Error('Product not found');

			order.addProduct({ product, amount: item.amount });
		});
		if (voucherCode) {
			const voucher = this.voucherRepository.getVoucherByCode({ code: voucherCode });
			if (voucher) {
				order.addVoucher({ voucher });
			}
		}
		this.orderRepository.saveOrder({ order });
		return {
			total: order.getTotalValue(),
			freightTotal: order.getFreightValue(),
		}
	}
}