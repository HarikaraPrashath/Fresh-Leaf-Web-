import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    rating: {
        type: Number,
        required: true
      },
    name: {
      type: String,
      required: true
    },
    des: { 
      type: String,
      required: true
    }    
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", ReviewSchema);

export default Review;