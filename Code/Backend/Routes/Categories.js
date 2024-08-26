const express = require('express');
const app = express();
app.use(express.json());
const router = express.Router();

const Categories = require('../Models/Categories');


// API to add new category : ADMIN Dashboard Portal
router.post('/addCategory', async (req, resp) => {
    try {
        // Check all field are present or not
        const requiredFields = ['categoryName', 'description'];
        const missingFields = requiredFields.filter(field => !req.body.hasOwnProperty(field));

        if (missingFields.length > 0) {
            return resp.status(400).json({ error: `Missing required field: ${missingFields.join(',')}` });
        }

        const category = new Categories(req.body);
        const result = await category.save();
        resp.status(200).send(result);

    } catch (error) {
        console.error("Error while adding new category", error);
        resp.status(500).send("Internal Server Error");
    }
});

// API to get all categories : ADMIN Dashboard Portal
router.get("/category", async (req, resp) => {
    try {
        let allCategory = await Categories.find()
        if (allCategory.length > 0) {
            console.log("number of cat:", allCategory.length)
            resp.status(200).send({success: true,  allCategory, totalCategory: allCategory.length})
        } else {
            resp.status(404).send({ result: "No category found." })
        }
    } catch (error) {
        console.log("Error in getting categories", error)
        resp.status(500).send({ error: "Internal Server Error" })
    }
})


// API to get a single category detail : ADMIN Dashboard Portal
router.get("/category/:id", async (req, resp) => {
    try {
        const result = await Categories.findOne({ _id: req.params.id });
        if (result) {
            resp.status(200).send(result)
        } else {
            resp.status(404).send({ result: "No Category details." })
        }
    } catch (error) {
        console.error("Error in getting category detail.");
        resp.status(500).json({ error: "Internal server error" })
    }
})


// API to edit Category : ADMIN Dashboard Portal
router.put('/category/:id', async (req, resp) => {
    try {
        const result = await Categories.updateOne(
            { _id: req.params.id },
            {
                $set: req.body
            }
        );
        resp.status(200).json(result);

    } catch (error) {
        console.error("Error in updating product details:", error);
        resp.status(500).json({ error: "Internal Server Error" });
    }
})

// APi to delete category : ADMIN Dashboard Portal
router.delete('/delete/:id', async (req, resp) => {
    try {
        const categoryID = req.params.id;
        const existingCategory = await Categories.findById(categoryID)

        if (!existingCategory) {
            return resp.status(404).send({ error: "Category not found." })
        }

        const data = await Categories.deleteOne({ _id: categoryID })
        resp.send(data)
        console.log(data)

    } catch (error) {
        console.error("Error in deleting product:", error);
        resp.status(500).send({ error: "Internal Server Error" })
    }
})

// API to search category : ADMIN Dashboard Portal
router.get("/search/:key", async (req, resp) => {
    try {
        let result = await Categories.find({
            "$or": [
                { categoryName: { $regex: req.params.key, $options: 'i' } },
            ]
        });
        resp.send(result);
    } catch (error) {
        resp.status(500).send({ error: 'Internal Server Error' });
    }
});

module.exports = router;
