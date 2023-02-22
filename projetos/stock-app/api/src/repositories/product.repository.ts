import productsSchema from '../schemas/products.schema';
import { CreateProductDto } from '../services/product.service';
class ProductRepository {
  async createProduct(product: CreateProductDto) {
    const created = await (await productsSchema.create(product)).populate('productType');    
    return created.toObject();
  }

    async getAllProducts(){
    const listTypeProduct = await productsSchema.find().populate('productType');
    return listTypeProduct;
  }

  async getByIdProduct(id: Number){
    const getByIdProduct = await productsSchema.findById(id).populate('productType');
    return getByIdProduct;
  }

  async updateProduct(id: Number, product: CreateProductDto){
    const updateProduct = await productsSchema.findByIdAndUpdate(id, product);
    return updateProduct;
  }

  async deleteProduct(id: Number){
    const deleteProduct = await productsSchema.deleteOne(id);
    return deleteProduct;
  }

}

export default new ProductRepository();
