import { model, Schema } from 'mongoose';


const schemaField = new Schema(
  {
    type: String,
    isRequired: Boolean,
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
