import fieldSchema from '../schemas/field.schema'; 
import { CreateFieldDto } from '../services/field.service';

class FieldRepository {
  async createField(dto: CreateFieldDto) {
    const created = await fieldSchema.create(dto);    
    return created.toObject();
  }

    async getAllFields(){
    const listTypeField = await fieldSchema.find();
    return listTypeField;
  }

  async getByIdField(id: Number){
    const getByIdField = await fieldSchema.findById(id);
    return getByIdField;
  }

  async updateField(id: Number, dto: CreateFieldDto){
    const updateField = await fieldSchema.findByIdAndUpdate(id, dto);
    return updateField;
  }

  async deleteField(id: Number){
    const deleteField = await fieldSchema.deleteOne(id);
    return deleteField;
  }

}

export default new FieldRepository();
