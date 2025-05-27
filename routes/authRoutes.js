const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/USer');
const bcrypt = require('bcrypt');
const app = express();
const router = express.Router();




























router.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    // 1. Find user
    const user = await User.findOne({ username });
    console.log(user)
    if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    // 3. Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    // 4. NOW generate JWT (only after all checks pass)
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true in production
        maxAge: 3600000 // 1 hour
    });

    res.json({ token });
});


router.post('/signup',async( req,res )=>{ 
     try {
         const {username,password} = await req.body;
            if (!username || !password) {
                return res.status(400).json({ message: 'Username and password are required' });
            }
        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            password: hashPassword
        });

        if(!user) return res.status(400).json({ message: 'User not created' });

        return res.status(201).json({ message: 'User created successfully' });

     } catch (error) {
        console.log(error)
     }
})


router.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
    });
    res.json({ message: 'Logged out successfully' });
});


module.exports = router;


