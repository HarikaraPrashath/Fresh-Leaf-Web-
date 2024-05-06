import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        des: {
            type: String,
            required: true
        },
        duration: {
            type: Date,
            required: true
        },
        duratione: {
            type: Date,
            required: true
        }
    },
    { timestamps: true }
);

const UserAdd = mongoose.model("Ads", userSchema);

export default UserAdd; // Export the UserAdd model as the default export
