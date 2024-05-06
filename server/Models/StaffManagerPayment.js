import mongoose from "mongoose";


const Schema = mongoose.Schema;
const staffManagerPayment = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    cnumber: {
      type: String,
    },
    dateyear: {
      type: String,
      required: true,
    },
    cvc: {
        type: String,
        required: true,
      },
    branch : {
        type: String,
        required: true,
      },
  },
  { timestamps: true }
);

const staffManagerPaymentDetails = mongoose.model("staffManagerPaymentDetails", staffManagerPayment);

export default staffManagerPaymentDetails;
