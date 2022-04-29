import db from "./database";

function getProducts() {
	return db.query('SELECT * FROM products');
}

export default {
	getProducts
}