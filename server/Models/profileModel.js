import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    Id: {
        type: String,
        required: true,

    },
    Name: {
        type: String,
        required: true,

    },
    Email_address: {
        type: String,
        required: true,

    },
    Contact_No: {
        type: String,
        required: true,

    },
    NIC_number: {
        type: String,
        required: true,

    }
});

const Profile = mongoose.model('Profile', ProfileSchema);

export default Profile;
