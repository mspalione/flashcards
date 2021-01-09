const { request, response } = require('express')
const express = require('express')

const names = [
    {first: 'Melissa', last: 'Spalione'},
    {first: 'Michael', last: 'Spalione'},
    {first: 'Eli', last: 'Spalione'},
    {first: 'Aria', last: 'Spalione'},
    {first: 'Cai', last: 'Spalione'},
    {first: 'Ezri', last: 'Spalione'}
]

const app = express()
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/cards', (req, res) => {
    res.render('card', {prompt: "Who is buried in Grant's tomb?", hint: "Think about whose tomb it is."})
})
app.get('/sandbox', (req, res) => {
    res.render('sandbox', names)
})
app.listen(3000, () => {
    console.log("The application is running on localhost:3000!")
})