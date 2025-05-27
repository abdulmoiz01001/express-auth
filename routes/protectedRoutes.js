const express = require('express');
const authenticateJWT = require('../middleware/authenticateJWT');
const router = express.Router(); 


router.get('/data', authenticateJWT,(req, res) => {
    res.json({message:"protected data"});
})

module.exports = router;