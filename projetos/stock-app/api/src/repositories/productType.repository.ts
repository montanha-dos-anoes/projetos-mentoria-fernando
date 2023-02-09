import productsTypeSchema from '../schemas/productsType.schema';
import { CreateProductTypeDto } from '../services/productType.service';
class ProductTypeRepository {
  async create(productType: CreateProductTypeDto) {
    const created = await productsTypeSchema.create(productType);    
    return created.toObject();
  }
}

export default new ProductTypeRepository();
