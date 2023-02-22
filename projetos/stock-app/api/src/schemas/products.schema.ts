import { model, Schema } from "mongoose";
import schemaProductType from './productsType.schema';

const schemaFieldValue = new Schema(
  {
    name: String,
    value: String
  },
  {
    timestamps: true,
  },
);

const schemaProduct = new Schema(
    {
      code: String, 
      fieldValue: [schemaFieldValue],
      productType: { type: Schema.Types.ObjectId, ref: 'ProductType' },
      name: String,
      description: String,
      quantity: Number,
      priceInput: Number,
      priceOutput: Number,
      imageProduct: String,
      isActive: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    },
  );


  schemaProduct
  .virtual('productTypeData', {
    ref: 'ProductType',
    localField: 'productType',
    foreignField: '_id',
    justOne: true,
  });
  
  export default model('Product', schemaProduct, 'products');
