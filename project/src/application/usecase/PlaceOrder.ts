import Order from "../../domain/entity/Order";
import { IOrderRepository } from "../../domain/repository/OrderRepository";
import { IProductRepository } from "../../domain/repository/ProductRepository";
import { IVoucherRepository } from "../../domain/repository/VoucherRepository";
import PlaceOrderInput from "./PlaceOrderInput";
import PlaceOrderOutput from "./PlaceOrderOutput";

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

	execute(placeOrderInput: PlaceOrderInput): PlaceOrderOutput {
		const order = new Order({ cpf: placeOrderInput.cpf });
		placeOrderInput.items.forEach(item => {
			const product = this.productRepository.getProductById({ id: item.id });
			if (!product) throw new Error('Product not found');

			order.addProduct({ product, amount: item.amount });
		});
		if (placeOrderInput.voucherCode) {
			const voucher = this.voucherRepository.getVoucherByCode({ code: placeOrderInput.voucherCode });
			if (voucher) {
				order.addVoucher({ voucher });
			}
		}
		this.orderRepository.saveOrder({ order });
		return  new PlaceOrderOutput({
			total: order.getTotalValue(),
			freightTotal: order.getFreightValue(),
		});
	}
}