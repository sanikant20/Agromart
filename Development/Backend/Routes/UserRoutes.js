const express = require('express');
const User = require('../Models/User');
const app = express();
app.use(express.json());

const router = express.Router();

// API to get all users from database and list users in card AdminDashboard
router.get('/users', async(req, resp)=>{
    try {
        let users = await User.find();
        // console.log(users)
        if(users.length > 0){
            resp.status(200).send(users)
        }else{
            resp.status(404).send(error, "There is no user in database.")
        }
    } catch (error) {
        console.error("Erroe while fetching data: ", error)
        resp.status(500).send(error, " Internal Server Error")
    }
})

module.exports = router;
