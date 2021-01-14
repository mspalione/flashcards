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


app.use((req, res, next) => {
    req.message = 'This message made it!'
    next()
})

app.use((req, res, next) => {
    console.log(req.message)
    next()
})



app.get('/', (req, res) => {
    const name = req.cookies.username
    if(name)
        res.render('index', {name})
    else
        res.redirect('/hello')
})

app.get('/hello', (req, res) => {
    const name = req.cookies.username
    if(name)
        res.redirect('/')
    else
        res.render('hello')
})

app.get('/goodbye', (req, res) => {
    res.clearCookie("username")
    res.redirect('/hello')
})

app.post('/hello', (req, res) => {
    res.cookie('username', req.body.username)
    res.redirect('/')
})

app.get('/cards', (req, res) => {
    res.render('card', {prompt: "Who is buried in Grant's tomb?", hint: "Think about whose tomb it is."})
})

app.get('/sandbox', (req, res) => {
    res.render('sandbox', {names})
})

app.listen(3000, () => {
    console.log("The application is running on localhost:3000!")
})