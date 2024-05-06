import mongoose from "mongoose";


const Schema = mongoose.Schema;
const UserInforPayment = new Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    postalCode: {
        type: String,
        required: true,
      },
      cnumber : {
        type: String,
        required: true,
      }
  },
  { timestamps: true }
);

const userPayment = mongoose.model("UserInforPayment", UserInforPayment);

export default userPayment;
