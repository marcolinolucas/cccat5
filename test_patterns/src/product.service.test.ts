import productService from "./product.service";
import productDao from "./product.dao";
import sinon from 'sinon';

test('When request all products, expect return correctly', async function () {
	const products = await productService.getAllProducts();
	expect(products).toHaveLength(3);
});

test('When request all products with stub, expect return correctly', async function () {
	const getAllProductsStub = sinon.stub(productService, 'getAllProducts');
	getAllProductsStub.resolves([{ name: 'example' }])
	const products = await productService.getAllProducts();
	expect(products).toHaveLength(1);
	expect(products[0].name).toBe('example');
	getAllProductsStub.restore();
});

test('When request all products with spy dao calls, expect return correctly', async function () {
	const getProductsDaoSpy = sinon.spy(productDao, 'getProducts');
	const products = await productService.getAllProducts();
	expect(products).toHaveLength(3);
	expect(getProductsDaoSpy.calledOnce).toBe(true);
	getProductsDaoSpy.restore();
});

test('When request all products with mock, expect return correctly', async function () {
	const productServiceMock = sinon.mock(productService);
	productServiceMock.expects('getAllProducts').once().resolves([{ name: 'example' }])
	const products = await productService.getAllProducts();
	expect(products).toHaveLength(1);
	expect(products[0].name).toBe('example');
	productServiceMock.verify();
	productServiceMock.restore();
});
