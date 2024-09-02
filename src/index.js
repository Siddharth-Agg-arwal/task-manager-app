const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res) => {

    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    }
    catch (e) {
        res.status(400).send(e)
    }

    //IMPLEMENTATION OF POST REQUEST USING PROMISE CHAINING
    // user.save().then(() => {
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(400)
    //     res.send(e)
    // })
    // console.log(req.body)
    // res.send('testing!')
})

app.get('/users', async (req, res) => {

    try {
        const user = await User.find({})
        res.send(user)
    }
    catch (e) {
        res.status(500).send(e)
    }
    
    //IMPLEMENTATION OF GET REQUEST USING PROMISE CHAINING    
    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send()
    //     console.log('error : ', e)
    // })
})

app.get('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findById(_id)
        res.send(user)
    }
    catch (e) {
        res.status(500).send(e)
    }
})

app.post('/tasks', async (req, res) => {

    try {
        const task = new Task(req.body)
        await task.save()
        res.status(201).send(task)
    }
    catch (e) {
        res.status(501).send(e)
    }

})


app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(201).send(tasks)
    }
    catch (e) {
        res.status(501).send(e)
    }
})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if(!task){
            res.status(404).send('Task not found')
        }
        res.status(201).send(task)
    }
    catch (e) {
        res.status(501).send(e)
    }
})

app.listen(port, () => {
    console.log('Server is up on port: ' + port)
})

