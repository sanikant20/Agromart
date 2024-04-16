const express = require('express');
const router = express.Router();

const OrderModel = require('../Models/OrderModel');
const CartModel = require('../Models/CartModel')

// Routes api to place order : USER
router.post("/placeOrder", async (req, resp) => {
    try {
        const { user_id, user_email, cart } = req.body;
        if (!user_id || !user_email || !cart) {
            return resp.status(400).send({ success: false, message: "Please provide user_id, user_email, and cart data" });
        }

        // Check if the cart is empty
        if (cart.length === 0) {
            return resp.status(400).send({ success: false, message: "Cart is empty" });
        }

        // Loop through the cart items to process them
        for (const cartItem of cart) {
            const existingOrder = await OrderModel.findOne({ user_id });

            if (existingOrder) {
                // If the order exists, check if the product exists in the order
                const existingProduct = existingOrder.products.find(product => product.product_id === cartItem.product_id);

                if (existingProduct) {
                    existingProduct.quantity += cartItem.quantity;
                } else {
                    // If the product does not exist, add it to the products array
                    existingOrder.products.push({
                        product_id: cartItem.product_id,
                        category: cartItem.category,
                        name: cartItem.name,
                        price: cartItem.price,
                        quantity: cartItem.quantity,
                        weight: cartItem.weight,
                        description: cartItem.description
                    });
                }

                // Save the updated order
                await existingOrder.save();
            } else {
                // If the order does not exist, create a new order
                const newOrder = new OrderModel({
                    user_id: user_id,
                    user_email: user_email,
                    products: [{
                        product_id: cartItem.product_id,
                        category: cartItem.category,
                        name: cartItem.name,
                        price: cartItem.price,
                        quantity: cartItem.quantity,
                        weight: cartItem.weight,
                        description: cartItem.description
                    }]
                });
                await newOrder.save();
            }
        }

        // Remove products from the cart after placing the order
        await CartModel.deleteMany({ 'products._id': { $in: cart.map(item => item._id) } });

        resp.status(200).send({ success: true, message: "Order placed successfully." });
    } catch (error) {
        console.error(error);
        resp.status(500).send({ success: false, message: "Error placing order", error: error.message });
    }
});

// Route to mark an order as paid and store payment date 
router.post("/markOrderPaid", async (req, resp) => {
    try {
        const { orderId } = req.body;
        if (!orderId) {
            return resp.status(400).send({ success: false, message: "Please provide orderId" });
        }

        const order = await OrderModel.findById(orderId);
        if (!order) {
            return resp.status(404).send({ success: false, message: "Order not found" });
        }

        // Update payment status to 'Paid' and set payment date to current date and time
        order.set('payment.status', 'Paid'); 
        order.set('payment.paymentDate', new Date()); 
        await order.save();

        resp.status(200).send({ success: true, message: "Order marked as paid successfully." });
    } catch (error) {
        console.error(error);
        resp.status(500).send({ success: false, message: "Error marking order as paid", error: error.message });
    }
});


// API endpoint to get current order status : ADMIN 
router.get('/getOrderStatus/:id', async (req, res) => {
    try {
        const orderId = req.params.id;

        // Find the order by ID
        const order = await OrderModel.findById(orderId);

        // If order not found, return 404 Not Found
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Return the current order status
        res.json({ orderStatus: order.orderStatus });
    } catch (error) {
        console.error("Error while fetching order status: ", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API to change order status : ADMIN
router.put('/changeOrderStatus/:id', async (req, res) => {
    try {
        const orderId = req.params.id;
        const newStatus = req.body.newStatus;

        // Find the order by ID
        const order = await OrderModel.findById(orderId);

        // If order not found, return 404 Not Found
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Update the order status
        order.orderStatus = newStatus;
        await order.save();

        // Return the updated order
        res.json(order);
    } catch (error) {
        console.error("Error while changing order status: ", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Route to get orders data for a specific user with user id
router.post('/myOrderData', async (req, res) => {
    try {
        // Validate incoming data
        const { user_id } = req.body;
        if (!user_id) {
            return res.status(400).send({ success: false, message: "User ID is required" });
        }

        // Find order data for the provided user ID
        const order = await OrderModel.findOne({ user_id });
        if (!order) {
            // If no order data found
            return res.status(404).send({ success: false, message: "No order data found for the provided user ID" });
        }
        res.status(200).send({ success: true, order });

    } catch (error) {
        console.error("Server Error:", error.message);
        res.status(500).send({ success: false, message: "Server Error" });
    }
});

// Routes to get all order data: ADMIN
router.get('/allOrderData', async (req, resp) => {
    try {
        let orderData = await OrderModel.find();

        if (orderData.length > 0) {
            resp.status(200).send({ success: true, orderData, totalOrders: orderData.length });

        } else {
            resp.status(404).send("There are no orders.");
        }
    } catch (error) {
        console.error("Error while fetching order data: ", error);
        resp.status(500).send("Internal Server Error");
    }
});

// Routes to get single order data i.e., all products: ADMIN
router.get('/singleOrderData/:id', async (req, resp) => {
    try {
        let _id = req.params.id
        let singleOrderData = await OrderModel.findById(_id);
        resp.status(200).send(singleOrderData);
    } catch (error) {
        console.error("Error while fetching single order data: ", error);
        resp.status(500).send("Internal Server Error");
    }
});

// API to search order : ADMIN
router.get("/searchOrder/:key", async (req, res) => {
    try {
        const key = req.params.key;
        const result = await OrderModel.find({
            $or: [
                { user_email: { $regex: key, $options: 'i' } },
                { "payment.status": { $regex: key, $options: 'i' } },
                { orderStatus: { $regex: key, $options: 'i' } },
            ]
        });
        res.json({ success: true, response: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});



module.exports = router;
