import mongoose from "mongoose";
 

const Schema = mongoose.Schema;
const ProductOrderSchema = new Schema(
  {
    name: {
        type: String,
        required:true, 
      },
      Phone: {
        type: String,
        required:true, 
      },
      Address: {
        type: String,
        required:true, 
      },
      Totalprice: {
        type: String,
        required:true, 
      },
      // Pname: {
      //   type: String,
      //   required:true,
      // },
      // weight: {
      //   type: String,
      //   required: true, 
      // },    
      // qty: {
      //   type: String,
      //   required:true,
      // },
      // price: {
      //   type: String,
      //   required:true,
      // },
      
  },
  { timestamps: true }
);

const AddOrderProduct = mongoose.model("ProductOrderSchema", ProductOrderSchema);

export default AddOrderProduct;


