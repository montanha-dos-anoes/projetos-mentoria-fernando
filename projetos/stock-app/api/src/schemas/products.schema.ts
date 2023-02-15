import { model, Schema } from "mongoose";
import schemaProductType from './productsType.schema';


const schemaProduct = new Schema(
    {
      code: String, 
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
  export default model('Product', schemaProduct, 'products');
