import mongoose from "mongoose";


const Schema = mongoose.Schema;
const detailsSchema = new Schema(
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

const User = mongoose.model("UserDetails", detailsSchema);

export default User;
