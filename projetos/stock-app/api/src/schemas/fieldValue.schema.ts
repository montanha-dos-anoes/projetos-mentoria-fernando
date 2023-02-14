import { model, Schema } from 'mongoose';

const schemaField = new Schema(
  {
   
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    field: { type: Schema.Types.ObjectId, ref: 'Field' },
    value: String,
  },
  {
    timestamps: true,
  },
);


export default model('FieldValue', schemaField, 'field-value');