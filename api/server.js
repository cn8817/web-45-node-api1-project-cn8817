// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model.js')

const server = express()
server.use(express.json())

//GET /api/user/:id
server.get('/api/users/:id', (req,res)=> {
    User.findById(req.params.id)
        .then(users => {
            if(!users) {
                res.status(404).json({message: 'does not exist'})
            } else {
                res.status(200).json(users)
            }
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
})

//GET users
server.get('/api/users', (req,res)=> {
    User.find()
        .then(users => {
            if(!users) {
                res.status(404).json({message: "The user with the specified ID does not exist"})
            } else {
                res.status(200).json(users)
            }
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
})

//POST users
server.post('/api/users', (req,res)=> {
    const newUser = req.body
    User.insert(newUser)
        .then(users=> {
            if(!newUser.name || !newUser.bio) {
                res.status(400).json({message: "Please provide name and bio for the user"})
            } else {
                res.status(201).json(users)
            }
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
        if(!changes.id) {
            res.status(404).json({message: "The user with the specified ID does not exist"})
        } else{
            const updatedUser = await User.update(id, changes)
            if (!updatedUser) {
                res.status(400).json({message: "Please provide name and bio for the user"})
            } else {
                res.status(200).json(updatedUser)
            }
        }
    }catch (err) {
        res.status(500).json({message: err.message})
    }
})

//DELETE
server.delete('/api/users/:id', (req,res) => {
    User.remove(req.params.id)
        .then(users => {
            if(!users) {
                res.status(404).json({
                    message: "The user with the specified ID does not exist",
                })
            } else {
                res.status(200).json(users)
            }
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
