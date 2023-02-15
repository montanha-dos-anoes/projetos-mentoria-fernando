import productsTypeSchema from '../schemas/productsType.schema';
import { CreateProductTypeDto } from '../services/productType.service';
class ProductTypeRepository {

  async createTypeProduct(productType: CreateProductTypeDto) {
    const created = await productsTypeSchema.create(productType);    
    return created.toObject();
  }

  async getAllTypeProducts(){
    const listTypeProduct = await productsTypeSchema.find();
    return listTypeProduct;
  }

  async getByIdTypeProduct(id: Number){
    const getByIdTypeProduct = await productsTypeSchema.findById(id);
    return getByIdTypeProduct;
  }

  async updateTypeProduct(id: Number, productsType: CreateProductTypeDto){
    const updateTypeProduct = await productsTypeSchema.findByIdAndUpdate(id, productsType);
    return updateTypeProduct;
  }

  async deleteTypeProduct(id: Number){
    const deleteTypeProduct = await productsTypeSchema.deleteOne(id);
    return deleteTypeProduct;
  }


  
}

export const productsTypeRepository =  new ProductTypeRepository();
