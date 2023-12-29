import mongoose from "mongoose";
// import Products from './../client/src/pages/Admin/Products';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    
    shipping: {
      type: Boolean,
    },
    reviews: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Review'
      }
  ]
  },
  { timestamps: true }
);






export default mongoose.model("Products", productSchema);