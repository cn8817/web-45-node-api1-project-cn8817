// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model.js')

const server = express()
server.use(express.json())

//GET /api/user/:id
server.get('/api/users/:id', (req,res)=> {
    User.findById(req.params.id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
})

//GET users
server.get('/api/users', (req,res)=> {
    User.find()
        .then(users => {
            console.log(users)
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
})

//POST users
server.post('/api/users', (req,res)=> {
    const newUser = req.body
    User.create(newUser)
        .then(user=> {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
})

//PUT
server.put('/api/users/:id', async (req,res)=> {
    const {id} = req.params
    const changes = req.body

    try{
        const result = await User.update(id, changes)
        res.status(200).json(result)
    }catch (err) {
        res.status(500).json({message: err.message})
    }
})

//DELETE
server.delete('/api/users/:id', (req,res) => {
    User.delete(req.params.id)
        .then(user => {
            if(user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({
                    message: `user ${req.params.id} does not exist`,
                })
            }
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
