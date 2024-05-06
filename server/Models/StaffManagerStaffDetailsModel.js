import mongoose from "mongoose";


const Schema = mongoose.Schema;
const staffManagerStaffSchema = new Schema(
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
    batch: {
        type: String,
        required: true,
      }
  },
  { timestamps: true }
);

const StaffManagerStaffDetails = mongoose.model("staffManagerStaffInfo", staffManagerStaffSchema);

export default StaffManagerStaffDetails;
