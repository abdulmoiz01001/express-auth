
const fetchProducts = (req, res) => {
    try {
        //  const { products } = req.body;  

        //  if (!products) {
        //     return res.status(400).json({ message: 'Products not found' });
        //     }

        //     if (products.length === 0) {
        //         return res.status(400).json({ message: 'Products not found' });
        //     }

        //     const products2 = PRODUCTS.get()
            
        //     if (!products2) {
        //         return res.status(400).json({ message: 'Products not found' });
        //     }

        //     products2.push(products)
        //     products2.save();
    } catch (error) {
        console.log(error)
    }
}

module.exports = {fetchProducts};