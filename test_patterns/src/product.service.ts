import productDao from "./product.dao";

async function getAllProducts() {
	const products = await productDao.getProducts();
	return products;
}

export default {
	getAllProducts,
}