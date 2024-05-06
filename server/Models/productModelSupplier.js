import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SupplierSchema = new Schema({
    Id: {
        type: String,
        required: true,
        unique: true, // Ensure Id is unique
        
    },
    name: {
        type: String,
        required: true,
        
    },
    qty: {
        type: Number, 
        required: true,
        
    },
    netweight: {
        type: Number,
        required: true,
        
    },
    unitprice: {
        type: Number, 
        required: true,
        
    },
    totalprice: {
        type: Number,
        required: true,
        
    }
});

// Custom validation for ensuring unique name for each Id
SupplierSchema.path('name').validate(async function(value) {
    // Check if there's a document with the same Id but a different name
    const existingProduct = await this.constructor.findOne({ Id: this.Id, name: { $ne: value } });
    return !existingProduct; // Return false if there's a product with the same Id but different name
}, 'A product with the same ID but a different name already exists');

const SupplierProduct = mongoose.model("SupplierProduct", SupplierSchema); // Corrected model name

export default SupplierProduct; // Corrected export

