import { productsTypeRepository }  from '../repositories/productType.repository';

export interface CreateProductTypeDto {
  description: String;
  fields: String;
  type: String,
  product: String,
  name: String,
  orderRegister: Number,
  isRequired: Boolean,
}

class ProductTypeService {

  async create(dto: CreateProductTypeDto) {
    const created = await productsTypeRepository.createTypeProduct(dto);
    return created;
  }

  async get(){
    const listTypeProduct = await productsTypeRepository.getAllTypeProducts();
    return listTypeProduct;
  }

  async getById(id: string){
    const getProductById = await productsTypeRepository.getByIdTypeProduct(id);
    return getProductById;
  }

  async update(id: string, dto: CreateProductTypeDto){
    const updateTypeProduct = await productsTypeRepository.updateTypeProduct(id, dto);
    return updateTypeProduct;
  }

  async delete(id: string){
    const deleteTypeProduct = await productsTypeRepository.deleteTypeProduct(id);
    return deleteTypeProduct;
  }


}

export default new ProductTypeService();
