import Dimension from "../../../domain/entity/Dimension";
import Product from "../../../domain/entity/Product";
import { IProductRepository } from "../../../domain/repository/ProductRepository";

export class ProductRepositoryMemory implements IProductRepository {
	products: Product[];
	
	constructor() {
		this.products = [
			new Product({
				id: 1,
				description: 'first product',
				price: 100,
				dimension: new Dimension({
					height: 20,
					width: 15,
					depth: 10,
				}),
				weight: 1,
			}),
			new Product({
				id: 2,
				description: 'second product',
				price: 20,
				dimension: new Dimension({
					height: 100,
					width: 30,
					depth: 10,
				}),
				weight: 3,
			}),
			new Product({
				id: 3,
				description: 'third product',
				price: 500,
				dimension: new Dimension({
					height: 200,
					width: 100,
					depth: 50,
				}),
				weight: 40,
			})
		];
	}

	getProductById({ id }: { id: number; }): Product | undefined {
		return this.products.find(product => product.id === id);
	}
}