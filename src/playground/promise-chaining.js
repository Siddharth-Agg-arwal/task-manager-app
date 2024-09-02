// Code using promise chaining to delete a task while also counting the number of false values in the code.

require('../db/mongoose')
const Task = require('../models/task') 
const User = require('../models/user')

// Task.findOneAndDelete('66cccf7eeeb070c46cad8d50').then((task) => {
//     console.log(task)
//     return Task.countDocuments({completed : false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

//async function to find and delete a task by ID and then count "false" completed docs
const deleteTaskAndCount = async (id) => {
    const task = await Task.findOneAndDelete(id)
    const count = await Task.countDocuments({completed : false})
    console.log(task)
    return count
}

deleteTaskAndCount('66cd533f095f4b7fdfb59831').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log('e : ', e)
})



//async function to find and update age 
const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    return count
}

// updateAgeAndCount('66cd52cfac2dc796cf922563', 26).then((count) => {
//     console.log(count)
// }).catch((e) => {
//     console.log(e)
// })