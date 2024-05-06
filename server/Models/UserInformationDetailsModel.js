import mongoose from "mongoose";
//userinfomodel

const Schema = mongoose.Schema;
const UserInformationSchema = new Schema(
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
    mobile: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    posterCode: {
        type: String,
        required: true,
      }
  },
  { timestamps: true }
);

const UserDetails = mongoose.model("UserInformationDetails", UserInformationSchema);

export default UserDetails;
