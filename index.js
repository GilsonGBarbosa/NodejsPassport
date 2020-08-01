const path = require('path')
const express = require('express')
const bodyParser = require("body-parser")
const morgan = require('morgan')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const mongoose = require('mongoose')
const app = express()

require('./src/auth/local')(passport)

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.use(session({ secret: "GHJHJGGJHFghghf&$#", resave: false, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
//CONFIG PUG
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'src/views'))


require('./src/index')(app,passport)


//CONECÇÃO 
mongoose.Promise = global.Promise;
require('./src/index')(app,passport)
mongoose.connect('mongodb://localhost/db', {
    useMongoClient: true
}).then(() => {
    console.log('Conectado com sucesso')
}).catch((err) => {
    console.log('Houve um erro', err)
})



app.listen(9000, () => {
    console.log('Express has been started')
})




