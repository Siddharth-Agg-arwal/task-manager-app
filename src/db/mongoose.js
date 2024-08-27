const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser : true,
    useUnifiedTopology: true
})

const Task = mongoose.model('Task', {
    description : {
        type : String,
        required : true,
        trim : true,
    },
    completed : {
        type : Boolean,
        default : false,
    }
})

const task = new Task({
    description : ' akjnsdas  asldas   kys',
    // completed : true,
})

task.save().then(() => {
    console.log(task)
}).catch((error) => {
    console.log('Error : ',  error)
})

const User = mongoose.model('User', {
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
    }
})

// const me = new User({
//     name : 'Sid',
//     age : 35,
//     email : 'aggarwal.sid02@gmail.com',
//     password : 're12i3asd'
// })

// me.save().then( () => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error: ', error)
// })