import mongoose from 'mongoose';
import productRepository from '../repositories/product.repository';
import { productsTypeRepository } from '../repositories/productType.repository';
import productsSchema from '../schemas/products.schema';
import productsTypeSchema from '../schemas/productsType.schema';

type Field = {
  name: any;
  value: any;
}

let saveName = ''
let saveValue = ''

export interface CreateProductDto {
    code: String, 
    productType: string,
    name: String,
    description: String,
    quantity: Number,
    priceInput: Number,
    priceOutput: Number,
    imageProduct: String,
    fieldValue: String
    field: String
    value: String
  }
  interface FieldValue {
    [key: string]: Field;
  }
class ProductService {
  
   regexValidIsNumber = /^[0-9]+$/;
   responseIsNumber: any;
   regexValidIsString = /^(?![0-9])(?!.*\b(?:true|false)\b)[\w\sáéíóúàèìòùâêîôûãõç!@#$%^&*()-+=\\\[\]{}|;:'",.<>/?`~]+$/i
   responseIsString: any
   regexValidIsBoolean = /^(true|false)$/;
   responseIsBoolean: any
   stopCreateProduct = false;

  async create(dto: CreateProductDto) {
    try {
      const created = await productRepository.createProduct(dto);
      const fieldValueKeys = Object.keys(dto.fieldValue);


      const product = await productsSchema.findById(created._id).populate('productTypeData');
      const productType = await productsTypeSchema.findById(product?.productType);

      // console.log(product?.productType);
      // console.log(productType?.fields);

      fieldValueKeys.forEach((key: any) => {
        const field = dto.fieldValue[key] as unknown as Field;
        saveName = field.name;
        saveValue = field.value;
        // console.log(`Campo: ${saveName}, Valor: ${saveValue}`);
        this.responseIsString = this.regexValidIsString.test(saveValue);
        this.responseIsNumber = this.regexValidIsNumber.test(saveValue);
        this.responseIsBoolean = this.regexValidIsBoolean.test(saveValue);

         if (this.responseIsString == true && saveName == 'text') {
          console.log(`Esse campo " ${saveValue} " é uma string?: `,this.responseIsString);
          console.log(`E pode ser salvo pois o molde dele é ${saveName}`)
          console.log('\n');

          productType?.fields.forEach(field => {
            if(this.responseIsString == true && field.type == 'text'){
              console.log('Produto cadastrado com sucesso.')
            }
          })

        }else if (this.responseIsNumber == true && saveName == 'numeric') {
          console.log(`Esse campo: " ${saveValue} " é um numero?: `, this.responseIsNumber);
          console.log(`E pode ser salvo pois o molde dele é ${saveName}`)
          console.log('\n');

          productType?.fields.forEach(field => {
            console.log(field)
            if(this.responseIsNumber == true && field.type == 'numeric'){
              console.log('Produto cadastrado com sucesso.')
            }else{
            }
          })

        }else if (this.responseIsBoolean == true && saveName == 'boolean')  {
          console.log(`Esse campo: " ${saveValue} " é um booleano?: `, this.responseIsBoolean);
          console.log(`E pode ser salvo pois o molde dele é ${saveName}`)
          console.log('\n');

          productType?.fields.forEach(field => {
            if(this.responseIsBoolean == true && field.type == 'boolean'){
              console.log('Produto cadastrado com sucesso.')
            }else{
            }
          })

        } else {
          console.log(`Esse campo ${saveValue} está em um formato inválido. `)
          console.log('\n');
          this.stopCreateProduct = true
        }

      });
      if(this.stopCreateProduct == true){
        this.stopCreateProduct = false
        return `Erro ao cadastrar um produto pois existe algum formato inválido ou não bate com o tipo do campo!`;
      }else{
        return created;
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  async get(){
    const listProduct = await productRepository.getAllProducts();
    return listProduct;
  }

  async getById(id: number){
    const getProdutById = await productRepository.getByIdProduct(id);
    return getProdutById;
   }

   async update (id: Number, dto: CreateProductDto){
    const updateProduct = await productRepository.updateProduct(id, dto);
    return updateProduct
   }

   async delete(id: Number){
    const deleteProduct = await productRepository.deleteProduct(id);
    return deleteProduct;
   }


   async getByIdTypeProduct(id: Number){
    const getProductById = await productsTypeRepository.getByIdTypeProduct(id);
    return getProductById;
  }
}

export default new ProductService();
