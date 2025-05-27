const express = require('express');
const app = express();
require('dotenv').config();
const productsRoutes = require('./routes/productsRoutes')
const protectedRoutes = require('./routes/protectedRoutes');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(bodyParser.json())
app.use(cookieParser());

app.use('/products',productsRoutes);
app.use("/auth",authRoutes)
app.use("/protected",protectedRoutes);
// app.use('/addtocart',addToCartRoutes);
// app.use('/wishlist',wishlistRoutes);

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log(err);
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
