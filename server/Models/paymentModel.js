import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    Card_Holder_Name: {
        type: String,
        required: true,
        
    },
    Name_of_Bank: {
        type: String,
        required: true,
        unique: true,
        
    },
    Card_Number: {
        type: String,
        required: true,
        unique:true,
        
    },
    cvc: {
        type: String,
        required: true,

    },
    Expiry_Month: {
        type: String,
        required: true
    },
    Expiry_Year: {
        type: String,
        required: true
    },
    Branch: {
        type: String,
        required: true,

    }
});

const paymentDetailsAdd = mongoose.model('PaymentSchema', PaymentSchema);

export default paymentDetailsAdd;
