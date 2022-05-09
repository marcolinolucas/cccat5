import Product from "../entity/Product";

export interface IProductRepository {
	getProductById({ id }: { id: number }): Product | undefined;
}