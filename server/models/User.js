import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        min: 6,
        max: 100
    },
    fullname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: function() {
            return !this.fromGoogle;
        },
        min: 6
    },
    imageUrl: {
        type: String,
    },
    fromGoogle: {
        type: Boolean,
        default: false,
    },
    fromGithub: {
        type: Boolean,
        default: false,
    },
    fromTwitter: {
        type: Boolean,
        default: false,
    },
},
{ timestamps: true }
)

const UserModel = mongoose.model('Users', userSchema);

export default UserModel;