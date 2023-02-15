import productRepository from '../repositories/product.repository';


export interface CreateProductDto {
    code: String, 
    productType: String,
    name: String,
    description: String,
    quantity: Number,
    priceInput: Number,
    priceOutput: Number,
    imageProduct: String
  }

class ProductService {
  async create(dto: CreateProductDto) {
    const created = await productRepository.createProduct(dto);
    return created;
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


}

export default new ProductService();
