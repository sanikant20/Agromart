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

router.post("/AddToCart", upload.single('image'), async (req, resp) => {
    try {
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

        // Check if the product already exists in the cart
        const existingCartProduct = await Cart.findOne({
            product_id: req.body.product_id,
            user_id: req.body.user_id
        });

        if (existingCartProduct) {
            // Increment quantity if product already exists in the cart
            existingCartProduct.quantity += parseInt(req.body.quantity);
            await existingCartProduct.save();
            resp.status(200).send({ success: true, msg: "Product quantity updated", data: existingCartProduct });
        } else {
            // Add new product to cart
            const cart = new Cart({
                user_id: req.body.user_id,
                product_id: req.body.product_id,
                category: req.body.category,
                name: req.body.name,
                price: req.body.price,
                quantity: req.body.quantity,
                weight: req.body.weight,
                description: req.body.description,
                image: image,
            });
            let cartData = await cart.save();
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

        // Fetch cart products for the user
        const cartData = await Cart.find({ user_id: userId });

        if (cartData.length > 0) {
            // If cart is not empty, send cart products along with cart item count
            const cartItemCount = cartData.length;
            console.log("Total cart item count :", cartItemCount)
            resp.status(200).json({ success: true, msg: "Cart Products Retrieved", cartItemCount, data: cartData });
            console.log("Total cart item count :", cartItemCount)
        } else {
            // If cart is empty, send a message indicating so
            resp.status(200).json({ success: true, msg: "Cart is empty for this user", cartItemCount: 0 });
        }
    } catch (error) {
        resp.status(400).json({ success: false, msg: error.message });
    }
});


router.delete('/deleteCartProducts/:id', async (req, resp) => {
    try {
        // Get requested cart product id 
        const cartProductId = req.params.id;
        const existingProduct = await Cart.findById(cartProductId);

        if (!existingProduct) {
            return resp.status(404).send({ error: 'Product not found in cart' });
        }

        // Find the associated product
        const product = await Product.findById(existingProduct.product_id);

        if (!product) {
            return resp.status(404).send({ error: 'Associated product not found' });
        }

        // Increase the product quantity
        product.quantity += existingProduct.quantity;
        await product.save();

        // Delete the cart product
        const del = await Cart.deleteOne({ _id: cartProductId });
        console.log("Deleted cart product data: ", del);

        resp.status(200).send({ success: true, msg: `Product with id ${cartProductId} deleted successfully from cart.` });
    } catch (error) {
        console.error("Error in deleting cart product:", error);
        resp.status(500).send({ error: "Internal Server Error" });
    }
});


// // API to delete cart product
// router.delete('/deleteCartProducts/:id', async (req, resp) => {
//     try {
//         // get requested product id 
//         const cartProductId = req.params.id;
//         const existingProduct = await Cart.findById(cartProductId);

//         if (!existingProduct) {
//             return resp.status(404).send({ error: 'Product not found on cart' });
//         }

//         const del = await Cart.deleteOne({ _id: cartProductId });
//         console.log("Deleted cart product data: ", del);
//         resp.status(200).send({ success: true, msg: `Product with id ${cartProductId} deleted successfully from cart.` });

//     } catch (error) {
//         console.error("Error in deleting cart product:", error);
//         resp.status(500).send({ error: "Internal Server Error" });
//     }
// });


module.exports = router;
