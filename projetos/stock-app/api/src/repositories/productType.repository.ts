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

  async getByIdTypeProduct(id: string){
    const getByIdTypeProduct = await productsTypeSchema.findById(id);
    return getByIdTypeProduct;
  }

  async updateTypeProduct(id: string, productsType: CreateProductTypeDto){
    const updateTypeProduct = await productsTypeSchema.findByIdAndUpdate(id, productsType);
    return updateTypeProduct;
  }

  async deleteTypeProduct(id: string){
    const deleteTypeProduct = await productsTypeSchema.deleteOne({ _id: id });
    return deleteTypeProduct;
  }

  async getTypeProductByName(name: string){
    const productsTypes = await productsTypeSchema.find({ name: name});
    return productsTypes;
  }
}

export const productsTypeRepository =  new ProductTypeRepository();
