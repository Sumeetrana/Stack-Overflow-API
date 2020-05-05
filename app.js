const express = require('express');
const axios = require('axios');

const app = express();

app.get('/:tagname', (req, res) => {
    
    console.log(req.params.tagname)        
})



app.listen(3002, () => {
    console.log('Server running');
    
})