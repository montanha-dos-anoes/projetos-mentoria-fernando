import { productsTypeRepository } from '../repositories/productType.repository';


interface Field {
  type: string;
  isRequired: boolean;
  name: string;
  orderRegister: number;
}

export interface CreateProductTypeDto {
  description: String;
  fields: Field[];
  type: String,
  product: String,
  name: String,
  orderRegister: Number,
  isRequired: Boolean,
}

class ProductTypeService {

  async create(dto: CreateProductTypeDto) {
    const created = await productsTypeRepository.createTypeProduct(dto);

    if (!dto.fields || dto.fields.length == 0) {
      throw new Error('It is necessary to put at least one field!');
    }

    const saveFields = new Set();

    for (const field of dto.fields) {
      const exists = saveFields.has(field.name)
      if(!exists){
        saveFields.add(field.name)
      }else{
        throw new Error(`The field ${field.name} is duplicated!`);
      }
    }

    return created;

  }

  async get() {
    const listTypeProduct = await productsTypeRepository.getAllTypeProducts();
    return listTypeProduct;
  }

  async getById(id: string) {
    const getProductById = await productsTypeRepository.getByIdTypeProduct(id);
    return getProductById;
  }

  async update(id: string, dto: CreateProductTypeDto) {
    const updateTypeProduct = await productsTypeRepository.updateTypeProduct(id, dto);

    if (!dto.fields || dto.fields.length == 0) {
      throw new Error('It is necessary to put at least one field!');
    }
    
    const saveFields = new Set();

    for (const field of dto.fields) {
      const exists = saveFields.has(field.name)
      if(!exists){
        saveFields.add(field.name)
      }else{
        throw new Error(`The field ${field.name} is duplicated!`);
      }
    }

    return updateTypeProduct;
  }

  async delete(id: string) {
    const deleteTypeProduct = await productsTypeRepository.deleteTypeProduct(id);
    return deleteTypeProduct;
  }
}

export default new ProductTypeService();
