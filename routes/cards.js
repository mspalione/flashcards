const express = require('express')
const router = express.Router()
const {data} = require('../data/flashcardData.json')
const {cards} = data 

router.get('/', (req, res) => {
    let num = cards.length
    const id = Math.floor(Math.random() * num)
    res.redirect(`/cards/${id}`)
})

router.get('/:id', (req, res) => {
    const name = req.cookies.username
    const side = req.query.side ? req.query.side : 'question'
    const {id} = req.params 
    const text = cards[id][side]
    const {hint} = cards[id]
    const btnText = side === 'question' ? 'View Answer' : 'View Question'
    const btnlink = side === 'question' ? `answer` : `question`
    let templateData = {text, btnlink, btnText, id, name, side}
    if(side === 'question')
        templateData.hint = hint
        
    res.render('card', templateData)
})

router.use((req, res) => {
    const name = req.cookies.username
    const err = new Error('Not Found')
    err.status = 404
    const template = {name, err}

    res.render('error', template)
})

module.exports = router 