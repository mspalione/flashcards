const express = require('express')
const router = express.Router()
const {data} = require('../data/flashcardData.json')
const {cards} = data 

router.get('/', (req, res) => {
    const id = Math.floor(Math.random() * cards.length)
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
    let templateData = {text, btnlink, btnText, id, name}
    if(side === 'question')
        templateData.hint = hint
        
    res.render('card', templateData)
})

module.exports = router 