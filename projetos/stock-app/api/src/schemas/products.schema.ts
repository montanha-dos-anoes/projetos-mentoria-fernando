import { model, Schema } from "mongoose";

const schemaProduct = new Schema(
    {
      code: String, 
      fieldValues: {  },
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
