import mongoose from "mongoose";


const Schema = mongoose.Schema;
const staffRequest = new Schema(
  {
    inputItem : {
      type: String,
      required: true,
    },      
  },
  { timestamps: true }
);

const staffRequestDetails = mongoose.model("staffRequest", staffRequest);

export default staffRequestDetails;
