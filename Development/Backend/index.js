const express = require("express");
const app = express();
app.use(express.json());
const cors = require('cors')
app.use(cors());
require("dotenv").config();

const mongodb = require("./ConnectDB/config");

// APIs routers endpoint file
app.use("/api", require("./Routes/Auth"));
app.use("/api", require("./Routes/ProductRoutes"));
app.use("/api", require("./Routes/UserRoutes"));
app.use("/api", require("./Routes/Categories"));
app.use("/api", require("./Routes/ChangePasswordRoute"));
app.use("/api", require("./Routes/CartRoutes"));
app.use("/api", require("./Routes/OrderRoutes"));
app.use("/api", require("./Routes/ReviewRoutes"));
app.use("/api", require("./Routes/ShippingRoute"));
app.use("/api", require("./Routes/SeasonRoute"));
app.use("/api", require("./Routes/Payment"));
// Port to run server
const port = `${process.env.PORT}`;
app.listen(port, () => {
    console.log("Server is running on port:", port);
})

