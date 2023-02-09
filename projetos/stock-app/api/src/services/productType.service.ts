import productTypeRepository from '../repositories/productType.repository';

export interface CreateProductTypeDto {
  description: String;
}

class ProductTypeService {
  async create(dto: CreateProductTypeDto) {
    const created = await productTypeRepository.create(dto);
    return created;
  }
}

export default new ProductTypeService();
