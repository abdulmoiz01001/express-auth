const express = require('express');
const app = express();
require('dotenv').config();
const productsRoutes = require('./routes/productsRoutes')
const protectedRoutes = require('./routes/protectedRoutes');
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');

app.use(express.json());
app.use(bodyParser.json())
app.use(cookieParser());
// Serve static HTML files from /public
app.use(express.static(path.join(__dirname, 'public')));
// Use file routes

// Custom error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer-specific errors
    return res.status(400).json({ message: `Multer error: ${err.message}` });
  } else if (err) {
    // Other errors (e.g., invalid file type)
    return res.status(500).json({ message: `Server error: ${err.message}` });
}
next();
});

app.use('/api/files', fileRoutes);
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
