import mongoose from "mongoose";
 

const Schema = mongoose.Schema;
const ProductSchema = new Schema(
  {
    qty: {
      type: String,
      required: true, 
    },
    // name: {
    //   type: String,
    //   required:true, 
    // },

    // packs: {
    //   type: String,
    //   required:true,
    // },
    //   discription: {
    //     type: String,
    //     required:true,
    //   },

    //   price: {
    //     type: Number,
    //     required:true,
    //   },
      
  },
  { timestamps: true }
);

const AddProduct = mongoose.model("ProductSchema", ProductSchema);

export default AddProduct;