const express = require('express');
const axios = require('axios');

const app = express();

app.get('/:tagname', (req, res) => {
    axios.get(`https://api.stackexchange.com/2.2/questions?pagesize=10&order=desc&sort=creation&tagged=${req.params.tagname}&site=stackoverflow`)
        .then((questions) => {
            return res.status(200).json({questions: questions.data})
        }) 
        .catch(err => {
            return res.status(400).json({err})
        })
})

app.get('/question/:id', (req, res) => {
    axios.get(`https://api.stackexchange.com/2.2/questions/${req.params.id}?order=desc&sort=activity&site=stackoverflow`)
        .then(question => {
            res.status(200).json({ question: question.data })
        })
    
})

app.listen(3002, () => {
    console.log('Server running');
    
})