import fieldValueRepository from "../repositories/fieldValue.repository";

export interface CreateFieldValueDto{

    product: String,
    field: String,
    value: String,

}

class FieldValueService{

    async create(dto: CreateFieldValueDto){
        const created = await fieldValueRepository.createFieldValue(dto);
        return created;
    }

    async get (){
        const listFieldValue = await fieldValueRepository.getAllFieldValues();
        return listFieldValue;
    }

    async getById(id: number){
        const getFieldValueById = fieldValueRepository.getByIdFieldValue(id);
        return getFieldValueById;
    }

    async update(id: Number, dto: CreateFieldValueDto){
        const updateFieldValue = await fieldValueRepository.updateFieldValue(id, dto);
        return updateFieldValue;
    }

    async delete(id: Number){
        const deleteFieldValue = await fieldValueRepository.deleteFieldValue(id);
        return deleteFieldValue;
    }
}

export default new FieldValueService();