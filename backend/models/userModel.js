import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
            default: 'user'
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        }
    }, {
    timestamp: true,
})

const User = mongoose.model('User', userSchema)

export default User
