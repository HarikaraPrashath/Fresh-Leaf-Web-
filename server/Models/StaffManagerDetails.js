import mongoose from "mongoose";


const Schema = mongoose.Schema;
const ManagerdetailsSchema = new Schema(
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
    gender: {
      type: String,
    },
    exprience: {
      type: String,
      required: true,
    },
    branch: {
        type: String,
        required: true,
      }
  },
  { timestamps: true }
);

const Managerdetails = mongoose.model("StaffManagerDetails", ManagerdetailsSchema);

export default Managerdetails;
