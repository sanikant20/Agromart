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

// API to update product details : ADMIN
router.put('/products/:id', upload.single('image'), async (req, resp) => {
    try {
        let image = ''; // Initialize image variable

        // Check if there is a file uploaded
        if (req.file) {
            // Convert the image to base64
            const imageBuffer = fs.readFileSync(req.file.path);
            image = {
                data: imageBuffer.toString('base64'),
                contentType: req.file.mimetype
            };
            // Delete the uploaded file after converting to base64
            fs.unlinkSync(req.file.path);
        } else {
            // If no new image is uploaded, retain the existing image data in the database
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

// API to add new products with image
router.post("/addProductsWithImages", upload.single('productImage'), async (req, resp) => {
    try {       
        let product = new Product({
            category: req.body.category,
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            weight: req.body.weight,
            description: req.body.description,
            image: {
                data: fs.readFileSync("imageFile/productImage/" + req.file.filename),
                contentType: "image/png"
            },
        });
        let result = await product.save();
        console.log("Image is saved.");
        resp.status(200).send(result);
    } catch (error) {
        console.error("Error saving product image:", error);
        resp.status(500).send("Internal Server Error");
    }
});


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


// API to add new products : ADMIN
// router.post('/addproducts', async (req, resp) => {
//     try {
//         // Check all field are present or not
//         const requiredFields = ['category', 'name', 'price', 'quantity', 'weight', 'description'];
//         const missingFields = requiredFields.filter(field => !req.body.hasOwnProperty(field));

//         if (missingFields.length > 0) {
//             return resp.status(400).json({ error: `Missing required field: ${missingFields.join(',')}` });
//         }

//         let product = await Product(req.body)
//         let result = await product.save()
//         resp.status(200).send(result)
//     } catch (error) {
//         console.error("Error while adding new product", error);
//         resp.status(500).send("Internal Server Error:")
//     }
// })


// API to get products details : ADMIN
router.get("/products/:id", async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result)
    } else {
        resp.send({ result: "No data available with ID:", _id })
    }
})


// // API to update product details : ADMIN
// router.put('/products/:id', async (req, resp) => {
//     try {
//         const result = await Product.updateOne(
//             { _id: req.params.id },
//             {
//                 $set: req.body
//             }
//         );
//         resp.status(200).send(result);

//     } catch (error) {
//         console.error("Error in updating product details:", error);
//         resp.status(500).send({ error: "Internal Server Error" });
//     }
// });

// API to delete product
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


module.exports = router;
