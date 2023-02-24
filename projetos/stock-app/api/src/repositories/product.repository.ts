import productsSchema from '../schemas/products.schema';
import { CreateProductDto } from '../services/product.service';
class ProductRepository {
  async createProduct(product: CreateProductDto) {
    const created = await (await productsSchema.create(product)).populate('productType');
    return created.toObject();
  }

  async getAllProducts() {
    const listTypeProduct = await productsSchema.find().populate('productType');
    return listTypeProduct;
  }

  async getByIdProduct(id: string) {
    const getByIdProduct = await productsSchema.findById(id).populate('productType');
    return getByIdProduct;
  }

  async updateProduct(id: string, product: CreateProductDto) {
    const updateProduct = await productsSchema.findByIdAndUpdate(id, product);
    return updateProduct;
  }

  async deleteProduct(id: string) {
    const deleteProduct = await productsSchema.deleteOne({ _id: id });
    return deleteProduct;
  }

}

export default new ProductRepository();
