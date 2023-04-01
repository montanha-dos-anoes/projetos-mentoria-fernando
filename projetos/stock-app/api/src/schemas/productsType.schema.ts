import { model, Schema } from 'mongoose';
import { EnumFieldType } from './enumField';


const schemaField = new Schema(
  {
    type: {
      type: String,
      enum: EnumFieldType
    },
    isRequired: Boolean,
    name: { type: String, required: true },
    orderRegister: Number,
  },
  {
    timestamps: true,
  },
);


const schemaProductType = new Schema(
  {
    description: String,
    fields: [schemaField],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model('ProductType', schemaProductType, 'product-types');
