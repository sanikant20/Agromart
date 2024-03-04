import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [weight, setWeight] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState([]);

    const params = useParams();
    const navigate = useNavigate();

    // Fetch API to get product details
    useEffect(() => {
        const getProductDetails = async () => {
            try {
                let result = await fetch(`http://localhost:5000/api/products/${params.id}`);

                if (!result.ok) {
                    throw new Error(`Failed to fetch product details. Status: ${result.status}`);
                }

                let data = await result.json();

                setCategory(data.category);
                setName(data.name);
                setPrice(data.price);
                setQuantity(data.quantity);
                setWeight(data.weight);
                setDescription(data.description);
                setImage(data.image);
            } catch (error) {
                console.error("Error fetching product details:", error.message);
            }
        };

        getProductDetails();
    }, [params.id]);


    // Fetch update API to update product details
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('category', category);
            formData.append('name', name);
            formData.append('price', price);
            formData.append('quantity', quantity);
            formData.append('weight', weight);
            formData.append('description', description);
            formData.append('image', image);


            const update = await fetch(`http://localhost:5000/api/products/${params.id}`, {
                method: "PUT",
                body: formData,
            });

            if (update.ok) {
                let result = await update.json();
                console.log(result);
                alert("Product updated.");
                navigate("/products");
            } else {
                console.error("Failed to update.");
            }
        } catch (error) {
            if (error instanceof TypeError) {
                console.error("Network error. Please check your internet connection.", error);
            } else {
                console.error("Error updating product:", error.message);
            }
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Set image state to the selected file
    };


    return (
        <div>
            <section className="content-main" style={{ maxWidth: "1200px" }}>
                <form>
                    <div className="content-header d-flex justify-content-between align-items-center">
                        <h2 className="content-title">Update Product</h2>
                    </div>

                    <div className="row mt-4">
                        <div className="col-xl-8 col-lg-8">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label htmlFor="product_category" className="form-label">
                                            Category
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="category"
                                            className="form-control"
                                            id="product_category"
                                            defaultValue={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="product_name" className="form-label">
                                            Product Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Product Name"
                                            className="form-control"
                                            id="product_name"
                                            defaultValue={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="product_price" className="form-label">
                                            Price
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Price"
                                            className="form-control"
                                            id="product_price"
                                            defaultValue={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="product_quantity" className="form-label">
                                            Quantity
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Quantity"
                                            className="form-control"
                                            id="product_quantity"
                                            defaultValue={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="product_weight" className="form-label">
                                            Weight
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Weight"
                                            className="form-control"
                                            id="product_weight"
                                            defaultValue={weight}
                                            onChange={(e) => setWeight(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="product_description" className="form-label">
                                            Description
                                        </label>
                                        <textarea
                                            placeholder="Write description"
                                            className="form-control"
                                            id="product_description"
                                            defaultValue={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            rows="5"
                                        ></textarea>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="product_images" className="form-label">
                                            Images
                                        </label>
                                        <input
                                            type="file"
                                            placeholder="Enter Image from file "
                                            className="form-control"
                                            name="product_image"
                                            id="product_image"
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                    <div className="mb-3 d-flex justify-content-between">
                                        <Link to="/products" className="btn btn-danger text-white">
                                            Go to products
                                        </Link>

                                        <button type="button" onClick={handleUpdate} className="btn btn-primary">
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default EditProduct;
