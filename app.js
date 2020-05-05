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
    axios.get(`https://api.stackexchange.com/2.2/questions/${req.params.id}/answers?order=desc&sort=activity&site=stackoverflow`)
        .then(question => {
            if (question.data.items[0].is_accepted) {
                let ans = {}
                axios.get(`https://api.stackexchange.com/2.2/questions/${req.params.id}?order=desc&sort=activity&site=stackoverflow`)
                    .then(item => {
                        ans['Que.'] = item.data.items[0].title;
                        ans['Ans.'] = question.data.items[0];

                        return res.status(200).json({ans});
                    })
                    .catch(err => {
                        return res.status(404).json({err})
                    })
            } else {
                axios.get(`https://api.stackexchange.com/2.2/questions/${req.params.id}/answers?order=desc&sort=votes&site=stackoverflow`)
                    .then(questions => {
                        return res.status(200).json({questions});
                    })
                    .catch(err => {
                        return res.status(404).json({err});
                    })
            }
            
        })
    
})

app.get('*', (req, res) => {
    res.status(404).json({"Message: ": "Route not found"})
})

app.listen(3002, () => {
    console.log('Server running');
    
})