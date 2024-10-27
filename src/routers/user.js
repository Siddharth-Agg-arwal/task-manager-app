const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/users', async (req, res) => {

    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
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


router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (e) {
        res.status(400).send() 
    }
})

router.get('/users', auth, async (req, res) => {

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

router.get('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findById(_id)
        res.send(user)
    }
    catch (e) {
        res.status(500).send(e)
    }
})


router.patch('/users/:id', async ( req, res) => {

    //code to ensure user doesn't add any property not in the document
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValid = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValid) {
        return res.status(400).send({error : 'Invalid updates!'})
    }

    //actual code to update the user
    try{
        const user = await User.findById(req.params.id)

        updates.forEach((update) => {
            user[update] = req.body[update]
        })
        await user.save()

        
        // const user = await User.findByIdAndUpdate(_id, req.body, {new : true, runValidators: true})
        if(!user){
            res.status(404).send()
        }
        res.send(user)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

//Deleting a user
router.delete('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findByIdAndDelete(_id)

        if(!user){
            return res.status(404).send()
        }

        res.send(user)
    }
    catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router
