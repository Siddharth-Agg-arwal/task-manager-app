const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

router.post('/tasks', async (req, res) => {

    try {
        const task = new Task(req.body)
        await task.save()
        res.status(201).send(task)
    }
    catch (e) {
        res.status(501).send(e)
    }

})


router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(201).send(tasks)
    }
    catch (e) {
        res.status(501).send(e)
    }
})

router.get('/tasks/:id', async (req, res) => {
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

router.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    const validUpdates = ['description', 'completed']
    const updates = Object.keys(req.body)
    const isValid = updates.every((update) => validUpdates.includes(update))

    if (!isValid){
        return res.status(401).send({error : 'Invalid operation!'})
    }

    try{
        const task = await Task.findById(req.params.id)

        updates.forEach((update) => {
            task[update] = req.body[update]
        })

        await task.save()
        // const task = await Task.findByIdAndUpdate(_id, req.body, {new : true, runValidators : true})
        if(!task){
            res.status(404).send()
        }
        res.status(201).send(task)
    }
    catch (e){
        res.status(501).send(e)
    }
})

router.delete('/tasks/:id', async (req,res) => {
    const _id = req.params.id
    try{
        const task = await Task.findByIdAndDelete(_id)
        
        if (!task){
            return res.status(404).send()
        }

        res.status(201).send(task)
    }
    catch(e){
        res.status(501).send(e)
    }
}) 


module.exports = router