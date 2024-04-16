const express = require('express');
const router = express.Router();
const multer = require("multer");
const fs = require('fs');
const Product = require('../Models/Product');
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

// API to add product to cart
router.post("/AddToCart", upload.single('image'), async (req, resp) => {
    try {
        if (!req.file || !req.file.filename) {
            return resp.status(400).send({ success: false, msg: "Image file not provided" });
        }
        const imagePath = 'imageFile/CartProductImage/' + req.file.filename;
        const image = {
            data: fs.readFileSync(imagePath),
            contentType: "image/png"
        };

        // Check if the product exists in the main product database
        const existingProduct = await Product.findById(req.body.product_id);

        if (!existingProduct) {
            return resp.status(404).send({ success: false, msg: "Product not found" });
        }

        // Decrement the product quantity in the main product database
        existingProduct.quantity -= parseInt(req.body.quantity);
        await existingProduct.save();

        // Check if the user has an existing cart
        let cart = await Cart.findOne({ user_id: req.body.user_id });

        if (cart) {
            // Check if the product already exists in the cart for this user
            const existingCartItemIndex = cart.products.findIndex(product => product.product_id === req.body.product_id);

            if (existingCartItemIndex !== -1) {
                // Increment quantity if product already exists in the cart
                cart.products[existingCartItemIndex].quantity += parseInt(req.body.quantity);
            } else {
                // Add new product to cart
                cart.products.push({
                    product_id: req.body.product_id,
                    category: req.body.category,
                    name: req.body.name,
                    price: req.body.price,
                    quantity: req.body.quantity,
                    weight: req.body.weight,
                    description: req.body.description,
                    image: image,
                });
            }
            await cart.save();
            resp.status(200).send({ success: true, msg: "Product added to cart", data: cart });
        } else {
            // Create a new cart and add the product
            const newCart = new Cart({
                user_id: req.body.user_id,
                products: [{
                    product_id: req.body.product_id,
                    category: req.body.category,
                    name: req.body.name,
                    price: req.body.price,
                    quantity: req.body.quantity,
                    weight: req.body.weight,
                    description: req.body.description,
                    image: image,
                }]
            });

            let cartData = await newCart.save();
            resp.status(200).send({ success: true, msg: "Product added to cart", data: cartData });
        }
    } catch (error) {
        console.error("Error saving product to cart:", error);
        resp.status(500).send("Internal Server Error");
    }
});

// API to retrieve cart products for a specific user
router.get("/CartData/:userId", async (req, resp) => {
    try {
        const userId = req.params.userId;

        // Fetch cart data for the user
        const cart = await Cart.findOne({ user_id: userId });

        if (cart) {
            // If cart exists, calculate cart item count based on the length of the products array
            const cartItemCount = cart.products.length;
            console.log("Total cart item count:", cartItemCount);
            resp.status(200).json({ success: true, msg: "Cart Products Retrieved", cartItemCount, data: cart.products });
        } else {
            // If cart is empty, send a message indicating so
            resp.status(200).json({ success: true, msg: "Cart is empty for this user", cartItemCount: 0, data: [] });
        }
    } catch (error) {
        resp.status(400).json({ success: false, msg: error.message });
    }
});


// API to delete cart product
router.delete('/deleteCartProducts/:id', async (req, resp) => {
    try {
        // Get requested cart product id 
        const cartProductId = req.params.id;

        // Find the cart of the user
        const cart = await Cart.findOne({ 'products._id': cartProductId });

        if (!cart) {
            return resp.status(404).send({ error: 'Cart not found' });
        }

        // Find the index of the product within the cart
        const productIndex = cart.products.findIndex(product => product._id.toString() === cartProductId);

        if (productIndex === -1) {
            return resp.status(404).send({ error: 'Product not found in cart' });
        }

        // Find the associated product
        const product = await Product.findById(cart.products[productIndex].product_id);

        if (!product) {
            return resp.status(404).send({ error: 'Associated product not found' });
        }

        // Increase the product quantity
        product.quantity += cart.products[productIndex].quantity;
        await product.save();

        // Remove the product from the cart
        cart.products.splice(productIndex, 1);
        await cart.save();

        resp.status(200).send({ success: true, msg: `Product with id ${cartProductId} deleted successfully from cart.` });
    } catch (error) {
        console.error("Error in deleting cart product:", error);
        resp.status(500).send({ error: "Internal Server Error" });
    }
});


module.exports = router;
