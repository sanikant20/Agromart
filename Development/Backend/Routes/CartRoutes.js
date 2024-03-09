const express = require('express');
const router = express.Router();
const multer = require("multer");
const fs = require('fs');

const Cart = require('../Models/CartModel');
const { compareSync } = require('bcrypt');

// Image storage & file name setting
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'imageFile/CartProductImage');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// Image Handler
const upload = multer({ storage: storage });

// API to add products to cart
router.post("/AddToCart", upload.single('image'), async (req, resp) => {
    try {
        if (!req.file) {
            throw new Error('No image uploaded');
        }

        const imagePath = 'imageFile/CartProductImage/' + req.file.filename;
        const image = {
            data: fs.readFileSync(imagePath),
            contentType: "image/png"
        };

        const existingCartProduct = await Cart.findOne({ product_id: req.body.product_id });

        if (existingCartProduct) {
            // Increment quantity if product already exists in the cart
            existingCartProduct.quantity += parseInt(req.body.quantity);
            await existingCartProduct.save();
            resp.status(200).send({ success: true, msg: "Product quantity updated", data: existingCartProduct });
        } else {
            // Add new product to cart
            const cart = new Cart({
                product_id: req.body.product_id,
                category: req.body.category,
                name: req.body.name,
                price: req.body.price,
                quantity: req.body.quantity,
                weight: req.body.weight,
                description: req.body.description,
                image: image,
            });
            const cartData = await cart.save();
            console.log(cartData)
            resp.status(200).send({ success: true, msg: "Product added to cart", data: cartData });
        }
    } catch (error) {
        console.error('Error adding product to cart:', error);
        if (error instanceof FetchError) {
            resp.status(500).send({ success: false, msg: 'Network error occurred. Please try again later.' });
        } else {
            resp.status(400).send({ success: false, msg: error.message });
        }
    }
});


router.get("/CartData", async (req, resp) => {
    try {
        const cartData = await Cart.find();
        const dataArray = Array.isArray(cartData) ? cartData : [cartData]; // Ensure data is always an array
        if (dataArray.length > 0) {
            resp.status(200).send({ success: true, msg: "Cart Product Retrived", data: dataArray });
        } else {
            resp.status(200).send({ success: true, msg: "Cart is empty!!!" });
        }
        console.log("cart data");
    } catch (error) {
        resp.status(400).send({ success: false, msg: error.message });
    }
});



module.exports = router;
