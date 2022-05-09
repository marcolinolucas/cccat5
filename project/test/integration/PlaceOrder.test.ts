import PlaceOrder from "../../src/application/usecase/PlaceOrder";
import { OrderRepositoryMemory } from "../../src/infra/repository/memory/OrderRepositoryMemory";
import { ProductRepositoryMemory } from "../../src/infra/repository/memory/ProductRepositoryMemory";
import { VoucherRepositoryMemory } from "../../src/infra/repository/memory/VoucherRepositoryMemory";

test('When place order without voucher, expect return total correctly', function () {
	const productRepositoryMemory = new ProductRepositoryMemory();
	const voucherRepositoryMemory = new VoucherRepositoryMemory();
	const orderRepositoryMemory = new OrderRepositoryMemory();
	
	const placeOrder = new PlaceOrder(
		productRepositoryMemory,
		voucherRepositoryMemory,
		orderRepositoryMemory,
	);
	const { total, freightTotal } = placeOrder.execute({
		cpf: '570.251.630-31',
		items: [
			{ id: 1, amount: 2 },
			{ id: 2, amount: 1 },
		],
	})
	expect(total).toBe(269.98);
	expect(freightTotal).toBe(49.98);
});