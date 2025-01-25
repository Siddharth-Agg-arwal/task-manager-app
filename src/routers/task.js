const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner : req.user._id
    })

    try {
        // const task = new Task(req.body)
        
        await task.save()
        res.status(201).send(task)
    }
    catch (e) {
        res.status(501).send(e)
    }

})


//GET //tasks?completed=true
//GET /tasks?limit=10&skip=0  
//GET /tasks?sortBy=createdAt_asc
//GET /tasks?sortBy=createdAt_desc
router.get('/tasks', auth, async (req, res) => {

    // const match = {}
    const query = {
        owner : req.user.id
    }

    const sort = {}
    if(req.query.sortBy){
        const parts = req.query.sortBy.split('_')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    const completed = req.query.completed === 'true';

    //pagination
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);

    if(req.query.completed !== undefined){
        query.completed = completed;
    }

    try {
        
        const tasks = await Task.find(query).limit(limit).skip(skip).sort(sort)

        //or 
        // await req.user.populate({
        //     path : 'tasks',
        //     match,
        //     options : {
        //         limit : parseInt(req.query.limit)
        //     }
        // }).execPopulate()
        res.status(201).send(tasks)
    }
    catch (e) {
        res.status(501).send(e)
    }
})

router.get('/tasks/:id', auth,  async (req, res) => {
    const _id = req.params.id

    try {
        // const task = await Task.findById(_id)

        const task = await Task.findOne({_id, owner : req.user._id})
        
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
        // const task = await Task.findById(req.params.id)
        const task = await Task.findOne({_id : req.params.id, owner  : req.user._id})

        if(!task){
            res.status(404).send()
        }

        updates.forEach((update) => {
            task[update] = req.body[update]
        })

        await task.save()
        // const task = await Task.findByIdAndUpdate(_id, req.body, {new : true, runValidators : true})
        
        res.status(201).send(task)
    }
    catch (e){
        res.status(501).send(e)
    }
})

router.delete('/tasks/:id', async (req,res) => {
    const _id = req.params.id
    try{
        // const task = await Task.findByIdAndDelete(_id)
        const task = await Task.findOneAndDelete({_id : req.params. id, owner : req.user._id})
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