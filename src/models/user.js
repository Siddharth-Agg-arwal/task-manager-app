const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    age : {
        type : Number,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    email : {
        type : String,
        unique : true,
        required : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('email is invalid')
            }
        }
    }, 
    password : {
        type : String,
        required : true,
        trim : true,
        minlength : 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password can\'t be \'password\'')
            }
        }
    },
    tokens : [{
        token : {
            type : String,
            required: true,
        }
    }],
    avatar : {
        type: Buffer
    }
},
{
    timestamps : true,
}
)

//VIRTUAL SETS UP THE RELATION FOR DOCUMENTS IN MONGOOSE FOR LOCAL FIELD ID AND FOREIGN FIELD DEFINES THE ACTUAL PLACE WHERE THE DATA IS STORED.
userSchema.virtual('Tasks',{
    ref : 'Task',
    localField : '_id',
    foreignField : 'owner'
})

//CREATE A SEPARATE FUNCTION TO HIDE SOME DATA
// userSchema.methods.getPublicProfile = function () {
//     const user = this
//     const userObject = user.toObject()

//     delete userObject.password
//     delete userObject.tokens
//     return userObject
// }

//USE IN-BUILT JSON FUNCTION TO HIDE THE SAME DATA -> USED WITHOUT CALLING A FUNCTION USING SHORTHAND
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar // delete avatar JSON as its size may actually slow down the response.
    return userObject
}

userSchema.methods.generateAuthToken = async function (){
    const user = this
    const token = jwt.sign({ _id: user._id.toString()}, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})

    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user
}

userSchema.pre('save', async function (next) {
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)



module.exports = User