import fieldRepository from "../repositories/field.repository";

export interface CreateFieldDto{

    type: String,
    fieldValue: String,
    product: String,
    mandatory: Boolean,
    name: String,
    orderRegister: Number,
    isRequired: Boolean,
}

class FieldService{

    async create(dto: CreateFieldDto){
        const created = await fieldRepository.createField(dto);
        return created;
    }

    async get (){
        const listField = await fieldRepository.getAllFields();
        return listField;
    }

    async getById(id: number){
        const getFieldById = fieldRepository.getByIdField(id);
        return getFieldById;
    }

    async update(id: Number, dto: CreateFieldDto){
        const updateField = await fieldRepository.updateField(id, dto);
        return updateField;
    }

    async delete(id: Number){
        const deleteField = await fieldRepository.deleteField(id);
        return deleteField;
    }
}

export default new FieldService();
