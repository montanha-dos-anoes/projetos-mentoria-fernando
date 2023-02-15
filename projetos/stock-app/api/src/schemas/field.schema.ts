import { model, Schema } from 'mongoose';
import { EnumFieldType } from './enumField';
import schemaProductType from './productsType.schema';

const schemaField = new Schema(
  {
    type: {
      type: String,
      enum: EnumFieldType
    },
    fieldValue: { type: Schema.Types.ObjectId, ref: 'FieldValue' },
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    mandatory: Boolean,
    name: String,
    orderRegister: Number,
    isRequired: Boolean,
  },
  {
    timestamps: true,
  },
);


export default model('Field', schemaField, 'fields');
