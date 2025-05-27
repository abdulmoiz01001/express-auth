const express = require('express');
const router = express.Router(); 

router.get('/get',(req, res) => {
    res.send('Get all products');
})

router.put('/get',(req, res) => {
    res.send('Get all products');
})

module.exports = router;