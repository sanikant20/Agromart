const express = require('express');
const Product = require('../Models/Product');
const app = express();
app.use(express.json());

const router = express.Router();

// API to get all products from MongoDB and list products in AdminDashboard
router.get('/products', async (req, resp) => {
    try {
        let products = await Product.find();
        if (products.length > 0) {
            resp.status(200).send(products)
        } else {
            resp.send(404).send({ result: "No product found" })
        }
    } catch (error) {
        console.error("Error in fetching product data: ", error);
        resp.send(500).send({ error: "Internal Server Error" })
    }
})

// API to add new products 
router.post('/addproducts', async (req, resp) => {
    try {
        // Check all field are present or not
        const requiredFields = ['category', 'name', 'price', 'quantity', 'weight', 'description', 'image'];
        const missingFields = requiredFields.filter(field => !req.body.hasOwnProperty(field));

        if (missingFields.length > 0) {
            return resp.status(400).json({ error: `Missing required field: ${missingFields.join(',')}` });
        }

        // request the body info of products
        let product = await Product(req.body)
        console.log(product);
        let result = await product.save()
        resp.status(200).send(result)
    } catch (error) {
        console.error("Error while adding new product", error);
        resp.status(500).send("Internal Server Error:")
    }
})

module.exports = router;
