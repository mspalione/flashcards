const { request, response } = require('express')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const names = [
    {first: 'Melissa', last: 'Spalione'},
    {first: 'Michael', last: 'Spalione'},
    {first: 'Eli', last: 'Spalione'},
    {first: 'Aria', last: 'Spalione'},
    {first: 'Cai', last: 'Spalione'},
    {first: 'Ezri', last: 'Spalione'}
]

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.set('view engine', 'pug')

const mainRoutes = require('./routes')
const cardRoutes = require('./routes/cards')
app.use(mainRoutes)
app.use('/cards', cardRoutes)

app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    res.locals.error = err
    res.status(err.status)
    res.render('error', err)
})

app.listen(3000, () => {
    console.log("The application is running on localhost:3000!")
})