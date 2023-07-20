import { FileWatcherEventKind, StringMappingType } from 'typescript';
import productRepository from '../repositories/product.repository';
import { productsTypeRepository } from '../repositories/productType.repository';


interface Field {
  type: string;
  isRequired: boolean;
  name: string;
  orderRegister: number;
  dateLimit: Date,
}

export interface CreateProductTypeDto {
  code: number;
  description: String;
  fields: Field[];
  type: String,
  product: String,
  name: String,
  orderRegister: Number,
  isRequired: Boolean,
  dateLimit: Date,
}

class ProductTypeService {

  async create(dto: CreateProductTypeDto) {
    const searchLastTypeProduct = await productsTypeRepository.getLastTypeProduct();
    let codeValueLastTypeProduct = searchLastTypeProduct?.code

    if (codeValueLastTypeProduct == undefined) {
      codeValueLastTypeProduct = 1
      dto.code = codeValueLastTypeProduct
    } else {
      codeValueLastTypeProduct = codeValueLastTypeProduct + 1
      dto.code = codeValueLastTypeProduct
    }

    if(dto.code > 99){
      throw new Error('IMany types of product listings');
    }

    if (!dto.fields || dto.fields.length == 0) {
      throw new Error('It is necessary to put at least one field!');
    }



    const saveFields = new Set();

    for (const field of dto.fields) {
      const exists = saveFields.has(field.name)
      if (!exists) {
        saveFields.add(field.name)
      } else {
        throw new Error(`The field ${field.name} is duplicated!`);
      }
    }

    const created = await productsTypeRepository.createTypeProduct(dto);
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


    if (!dto.fields || dto.fields.length == 0) {
      throw new Error('It is necessary to put at least one field!');
    }

    const saveFields = new Set();

    for (const field of dto.fields) {
      const exists = saveFields.has(field.name)
      if (!exists) {
        saveFields.add(field.name)
      } else {
        throw new Error(`The field ${field.name} is duplicated!`);
      }
    }

    // descobrir se tem produto vinculado
    const productsByType = await productRepository.findByProductType(id);

    if (productsByType.length > 0) {

      const productType = await productsTypeRepository.getByIdTypeProduct(id);

      const dtoRequiredFields = dto.fields.filter(field => field.isRequired);
      const originalRequiredFields = productType?.fields.filter(field => field.isRequired) || [];

      for (const field of originalRequiredFields) {
        const fieldExists = dtoRequiredFields.find(fieldDto => fieldDto.name == field.name)
        if (!fieldExists) {
          throw new Error(`It is not possible to remove a required field in this product type with linked products!`);
        }
      }

      for (const field of dtoRequiredFields) {
        const fieldExists = originalRequiredFields.find(fieldDto => fieldDto.name == field.name)
        if (!fieldExists) {
          throw new Error(`It is not possible to add a new required field if you have linked products!`);
        }
      }
    }

    const updateTypeProduct = await productsTypeRepository.updateTypeProduct(id, dto);
    return updateTypeProduct;
  }

  async delete(id: string) {
    const products = await productRepository.findByProductType(id);
    if (products.length > 0) {
      throw new Error(`Has products with this product type!`);
    }
    const deleteTypeProduct = await productsTypeRepository.deleteTypeProduct(id);
    return deleteTypeProduct;
  }
}

export default new ProductTypeService();
