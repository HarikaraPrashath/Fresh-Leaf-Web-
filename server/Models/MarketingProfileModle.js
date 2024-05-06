import mongoose from "mongoose";

const Schema = mongoose.Schema;
const detailsofMarketingSchema = new Schema(
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
        exprience: { // Corrected the field name to experience
          type: String,
          required: true,
        },
        batch: { // Changed from branch to batch
          type: String,
          required: true,
        }
      },
      { timestamps: true }
    );

const UserofMarketing = mongoose.model("detailsofMarketing", detailsofMarketingSchema);

export default UserofMarketing;
