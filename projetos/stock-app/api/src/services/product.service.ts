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
    try {

      const productType = await productsTypeRepository.getByIdTypeProduct(dto.productType);
      if (!productType) {
        return 'Tipo de produto não existe';
      }

      const fieldValues = dto.fieldValues;
      const formatFieldValue = Object.keys(fieldValues);

      // let armazenaField = {};
      // for (const field of productType.fields){
      //   armazenaField = field.name;
      //   console.log(armazenaField);

      // }
    
      // let armazenaFieldValues = {}
      // formatFieldValue.forEach( itens => {
      //   armazenaFieldValues = itens;
      //   console.log(armazenaFieldValues);
      // })

      // if(armazenaField != armazenaFieldValues){
      //   console.log('tem alguma coisa diferente');
      //   return 'Verifque se o nome dos campos está de acordo com o valor dos campos, ou se tem mais campos que valor dos campos'
      // }

      // const typeKeys = productType.fields.map(field => [field.name, field]) as any
      // const uniqueListNameType = new Map(typeKeys) as any

      // console.log('typeKeys');
      // console.log(typeKeys);
      // console.log('\n');
      // console.log("uniqueListNameType")
      // console.log(uniqueListNameType);

      // for(const keyFieldDto of formatFieldValue){
      //   const fieldFound = uniqueListNameType.set[keyFieldDto];
      //   console.log(fieldFound)
      //   if(!fieldFound){
      //     console.log(fieldFound)
      //     console.log('field' + keyFieldDto + ' não existe no tipo' + uniqueListNameType)
      //     return `deu ruim ${keyFieldDto} não existe em ${uniqueListNameType}`;
      //   }
      // }

      



      for (const field of productType.fields) {

        const fieldValues = dto.fieldValues;
        const fieldValue = dto.fieldValues[field.name];
        if (field.isRequired && fieldValue == undefined) {
          return 'field é obrigatorio'
        }

        if (fieldValue == undefined) return;

        if (field.type == 'text') {
          const regexValidIsString = /^(?![0-9])(?!.*\b(?:true|false)\b)[\w\sáéíóúàèìòùâêîôûãõç!@#$%^&*()-+=\\\[\]{}|;:'",.<>/?`~]+$/i;
          const hasValidString = regexValidIsString.test(fieldValue);
          if (!hasValidString) {
            return 'o field precisa ser uma string valida';
          }
        }

        if (field.type == 'numeric') {
          const regexValidIsNumber = /^[0-9]+$/;
          const hasValidNumeric = regexValidIsNumber.test(fieldValue);
          if (!hasValidNumeric) {
            return 'o field precisa ser um número';
          }
        }

        if (field.type == 'boolean') {
          const regexValidIsBoolean = /^(true|false)$/;
          const hasValidBoolean = regexValidIsBoolean.test(fieldValue);
          if (!hasValidBoolean) {
            return ' o field precisa ser um booleano';
          }
        }
      }

      const created = await productRepository.createProduct(dto);
      return created;

    } catch (error) {
      console.log(error)
      return error;
    }
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
