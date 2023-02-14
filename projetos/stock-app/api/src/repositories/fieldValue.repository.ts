import fieldValueSchema from "../schemas/fieldValue.schema"; 
import { CreateFieldValueDto } from "../services/fieldValue.service"; 

class FieldValueRepository {
  async createFieldValue(dto: CreateFieldValueDto) {
    const created = await fieldValueSchema.create(dto);    
    return created.toObject();
  }

    async getAllFieldValues(){
    const listTypeFieldValue = await fieldValueSchema.find();
    return listTypeFieldValue;
  }

  async getByIdFieldValue(id: Number){
    const getByIdFieldValue = await fieldValueSchema.findById(id);
    return getByIdFieldValue;
  }

  async updateFieldValue(id: Number, dto: CreateFieldValueDto){
    const updateFieldValue = await fieldValueSchema.findByIdAndUpdate(id, dto);
    return updateFieldValue;
  }

  async deleteFieldValue(id: Number){
    const deleteFieldValue = await fieldValueSchema.deleteOne(id);
    return deleteFieldValue;
  }

}

export default new FieldValueRepository();
