const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')
// const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const { User } = require('./models/user')
const bodyParser = require('body-parser')

const config = require('./config/key')

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('DB connected'))
    .catch(err => console.error(err))

// app.use(cookieParser)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('This is Index Page')
})

app.post('/api/users/register', (req, res) => {
    // console.log('Working------')
    const user = new User(req.body)

    user.save((err, doc) => {
        if (err) return res.json({
            success: false,
            err
        })

        return res.status(200).json({
            success: true
        })
    })
})

app.post('/api/user/login', (req, res) => {
    // 1. find the email 
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth Failed, E-mail not found"
            })

        // 2. compare password
        user.comparePassword()

    })


    // 3. generate token 
})

app.listen(port)