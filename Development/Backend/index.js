const express = require("express");

const app = express();
app.use(express.json());

const cors = require('cors')
app.use(cors());

const mongodb = require("./ConnectDB/config");

// APIs
app.use("/api", require("./Routes/Auth"));
app.use("/api", require("./Routes/ProductRoutes"));
app.use("/api", require("./Routes/UserRoutes"));



// Port to run server
const port = 5000;
app.listen(port, ()=>{
    console.log("Server is running on port:", port);
})

