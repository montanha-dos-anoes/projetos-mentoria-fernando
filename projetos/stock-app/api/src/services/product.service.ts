import mongoose from 'mongoose';
import productRepository from '../repositories/product.repository';
import { productsTypeRepository } from '../repositories/productType.repository';
import productsSchema from '../schemas/products.schema';
import productsTypeSchema from '../schemas/productsType.schema';

type Field = {
  name: any;
  value: any;
}

export interface CreateProductDto {
  code: String;
  productType: string;
  name: String;
  description: String;
  quantity: Number;
  priceInput: Number;
  priceOutput: Number;
  imageProduct: String;
  fieldValues: FieldValue;
}

interface FieldValue {
  [key: string]: string;
}
class ProductService {
  async create(dto: CreateProductDto) {

    const productType = await productsTypeRepository.getByIdTypeProduct(dto.productType);
    if (!productType) {
      throw new Error('Product type does not exist');
    }

    const searchLastProduct = await productRepository.getLastProduct(dto.productType);

    let codeValueLastProduct = searchLastProduct?.code;
    console.log('codeValueLastProduct' + codeValueLastProduct);
    let codeTypeProduct = productType.code;

    console.log(codeTypeProduct?.toString())


    if (codeValueLastProduct == undefined) {
      codeValueLastProduct = '1';
      const part1 = codeTypeProduct?.toString().padStart(2, '0');
      const part2 = codeValueLastProduct?.toString().padStart(4, '0');
      dto.code = `${part1}${part2}`;
    } else {
      const newNumber = parseInt(codeValueLastProduct) + 1;
      const newCodeProduct = newNumber.toString().padStart(6, '0');
      dto.code = newCodeProduct;
    }

    const fieldValues = dto.fieldValues;
    const formatFieldValue = Object.keys(fieldValues);

    let dicionario = {} as any
    for (const field of productType.fields) {
      dicionario[field.name] = field;
    }

    for (const keyDTO of formatFieldValue) {
      const fieldFound = dicionario[keyDTO];
      if (!fieldFound) {
        throw new Error(`Field " ${keyDTO} " does not exist in fieldType`)
      }
    }

    for (const field of productType.fields) {
      const fieldValues = dto.fieldValues;
      const fieldValue = dto.fieldValues[field.name];
      if (field.isRequired && fieldValue == undefined) {
        throw new Error(`field " ${field.name} " is obrigatory`)
      }

      if (field.dateLimit) {
        if (field.type == 'date') {
          const regexValidData = /^\d{4}-\d{2}-\d{2}$/;
          const hasValidDate = regexValidData.test(fieldValue);
          if (!hasValidDate) {
            throw new Error('field must be a valid date');
          }
          if (field.dateLimit.getTime() < new Date(fieldValue).getTime()) {
            throw new Error('date is greater than a limit');
          }
        }
      }

      if (field.type == 'date') {
        const regexValidData = /^\d{4}-\d{2}-\d{2}$/;
        const hasValidDate = regexValidData.test(fieldValue);
        if (!hasValidDate) {
          throw new Error('field must be a valid date');
        }
      }

      if (field.type == 'text') {
        const regexValidIsString = /^(?![0-9])(?!.*\b(?:true|false)\b)[\w\sáéíóúàèìòùâêîôûãõç!@#$%^&*()-+=\\\[\]{}|;:'",.<>/?`~]+$/i;
        const hasValidString = regexValidIsString.test(fieldValue);
        if (!hasValidString) {
          throw new Error('field must be a valid string');
        }
      }

      if (field.type == 'numeric') {
        const regexValidIsNumber = /^[0-9]+$/;
        const hasValidNumeric = regexValidIsNumber.test(fieldValue);
        if (!hasValidNumeric) {
          throw new Error('The field must be a number!');
        }
      }

      if (field.type == 'boolean') {
        const regexValidIsBoolean = /^(true|false)$/;
        const hasValidBoolean = regexValidIsBoolean.test(fieldValue);
        if (!hasValidBoolean) {
          throw new Error('The field needs to be a booleano');
        }
      }
    }

    const created = await productRepository.createProduct(dto);
    return created;
  }

  async get() {
    const listProduct = await productRepository.getAllProducts();
    return listProduct;
  }

  async getById(id: string) {
    const getProdutById = await productRepository.getByIdProduct(id);
    return getProdutById;
  }

  async update(id: string, dto: CreateProductDto) {
    const productType = await productsTypeRepository.getByIdTypeProduct(dto.productType);
    if (!productType) {
      throw new Error('Product type does not exist');
    }

    const fieldValues = dto.fieldValues;
    const formatFieldValue = Object.keys(fieldValues);

    let dicionario = {} as any
    for (const field of productType.fields) {
      dicionario[field.name] = field;
    }

    for (const keyDTO of formatFieldValue) {
      const fieldFound = dicionario[keyDTO];
      if (!fieldFound) {
        throw new Error(`Field " ${keyDTO} " does not exist in fieldType`)
      }
    }

    for (const field of productType.fields) {
      const fieldValues = dto.fieldValues;
      const fieldValue = dto.fieldValues[field.name];
      if (field.isRequired && fieldValue == undefined) {
        throw new Error('field is obrigatory')
      }

      if (field.dateLimit) {
        if (field.type == 'date') {
          const regexValidData = /^\d{4}-\d{2}-\d{2}$/;
          const hasValidDate = regexValidData.test(fieldValue);
          if (!hasValidDate) {
            throw new Error('field must be a valid date');
          }
          if (field.dateLimit.getTime() < new Date(fieldValue).getTime()) {
            throw new Error('date is greater than a limit');
          }
        }
      }

      if (field.type == 'date') {
        const regexValidData = /^\d{4}-\d{2}-\d{2}$/;
        const hasValidDate = regexValidData.test(fieldValue);
        if (!hasValidDate) {
          throw new Error('field must be a valid date');
        }
      }

      if (field.type == 'text') {
        const regexValidIsString = /^(?![0-9])(?!.*\b(?:true|false)\b)[\w\sáéíóúàèìòùâêîôûãõç!@#$%^&*()-+=\\\[\]{}|;:'",.<>/?`~]+$/i;
        const hasValidString = regexValidIsString.test(fieldValue);
        if (!hasValidString) {
          throw new Error('field must be a valid string');
        }
      }

      if (field.type == 'numeric') {
        const regexValidIsNumber = /^[0-9]+$/;
        const hasValidNumeric = regexValidIsNumber.test(fieldValue);
        if (!hasValidNumeric) {
          throw new Error('The field must be a number!');
        }
      }

      if (field.type == 'boolean') {
        const regexValidIsBoolean = /^(true|false)$/;
        const hasValidBoolean = regexValidIsBoolean.test(fieldValue);
        if (!hasValidBoolean) {
          throw new Error('The field needs to be a boolean');
        }
      }
      
    }
    const updateProduct = await productRepository.updateProduct(id, dto);
    return updateProduct
  }

  async delete(id: string) {
    const deleteProduct = await productRepository.deleteProduct(id);
    return deleteProduct;
  }


  async getByIdTypeProduct(id: string) {
    const getProductById = await productsTypeRepository.getByIdTypeProduct(id);
    return getProductById;
  }
}

export default new ProductService();
