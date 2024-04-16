const express = require('express');
const app = express();
app.use(express.json());
const router = express.Router();
const multer = require("multer");
const fs = require('fs');

const Product = require('../Models/Product');

// Image storage & file name setting
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'imageFile/productImage')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

// Image Handler
const upload = multer({ storage: storage })

// API to add new products with image
router.post("/addProducts", upload.single('product_image'), async (req, resp) => {
    try {
        const imagePath = 'imageFile/productImage/' + req.file.filename;
        const image = {
            data: fs.readFileSync(imagePath),
            contentType: "image/png"
        };

        let product = new Product({
            category: req.body.category,
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            weight: req.body.weight,
            description: req.body.description,
            image: image,
            season: req.body.season
        });
        let result = await product.save();
        console.log("Product data is saved with image.");
        resp.status(200).send(result);
    } catch (error) {
        console.error("Error saving product image:", error);
        resp.status(500).send("Internal Server Error");
    }
});


// API to update product details : ADMIN
router.put('/products/:id', upload.single('image'), async (req, resp) => {
    try {
        let image = '';

        // Check if there is a file uploaded
        if (req.file) {
            // Convert the image to base64
            image = {
                data: fs.readFileSync("imageFile/productImage/" + req.file.filename),
                contentType: "image/png"
            };
            // Delete the uploaded file after converting to base64
            fs.unlinkSync(req.file.path);
        } else {
            // If no new image is uploaded, store the existing image data in the database
            const existingProduct = await Product.findById(req.params.id);
            image = existingProduct.image;
        }

        const result = await Product.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    ...req.body,
                    image: image // Update the image field in the database
                }
            }
        );
        resp.status(200).send(result);
    } catch (error) {
        console.error("Error in updating product details:", error);
        resp.status(500).send({ error: "Internal Server Error" });
    }
});


// API to get all products list products in AdminDashboard & Mobile
router.get('/products', async (req, resp) => {
    try {
        let products = await Product.find();

        if (products.length > 0) {
            resp.status(200).send({ success: true, products, totalProducts: products.length })
        } else {
            resp.status(404).send({ result: "No product found" })
        }
    } catch (error) {
        // console.error("Error in fetching product data: ", error);
        resp.send(500).send({ error: "Internal Server Error" })
    }
})

// Api to get in-stock and out-of-stock product number : Dashboard
router.get('/in-out-stock-products', async (req, resp) => {
    try {
        let products = await Product.find();

        // Filter products based on quantity
        const inStockProducts = products.filter(product => product.quantity > 0);
        const outOfStockProducts = products.filter(product => product.quantity === 0);

        const inStockProductsNumber = inStockProducts.length;
        const outOfStockProductsNumber = outOfStockProducts.length;

        resp.status(200).send({
            success: true,
            inStockProductsNumber,
            outOfStockProductsNumber
        });
    } catch (error) {
        console.error("Error in fetching product data: ", error);
        resp.status(500).send({ error: "Internal Server Error" });
    }
});

// API to get products details for edit form: ADMIN
router.get("/editProducts/:id", async (req, res) => {
    try {
        let result = await Product.findOne({ _id: req.params.id });
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send({ message: "No data available with this ID:" });
        };
    } catch (error) {
        console.error("Error fetching product details:", error);
        res.status(500).send({ message: "Internal Server Error" });
    };
});

// API to get products details: Customer
router.get("/products/:id", async (req, res) => {
    try {
        let result = await Product.findOne({ _id: req.params.id });
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send({ message: "No data available with this ID:" });
        }
    } catch (error) {
        console.error("Error fetching product details:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});


// API to delete product : Dashboard
router.delete('/products/:id', async (req, resp) => {
    try {
        // get requested product id 
        const productId = req.params.id;
        const existingProduct = await Product.findById(productId);

        if (!existingProduct) {
            return resp.status(404).send({ error: 'Product not found' });
        }

        const del = await Product.deleteOne({ _id: productId });
        resp.status(200).send(del)

    } catch (error) {
        console.error("Error in deleting product:", error);
        resp.status(500).send({ error: "Internal Server Error" });
    }
})


// API to search product : Dashboard
router.get("/searchProduct/:key", async (req, res) => {
    try {
        let result = await Product.find({
            "$or": [
                { category: { $regex: req.params.key, $options: 'i' } },
                { name: { $regex: req.params.key, $options: 'i' } },
            ]
        });

        res.status(200).send(result);
    } catch (error) {
        console.error("Error searching products:", error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});


module.exports = router;
