
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddProductMain = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [weight, setWeight] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const addProduct = async () => {
    if (!selectedCategory || !name || !price || !quantity || !weight || !description || !image) {
      setError(true);
      return;
    }
    try {
      const formData = new FormData();
      formData.append('category', selectedCategory);
      formData.append('name', name);
      formData.append('price', price);
      formData.append('quantity', quantity);
      formData.append('weight', weight);
      formData.append('description', description);
      formData.append('productImage', image);

      const result = await fetch("http://localhost:5000/api/addProductsWithImages", {
        method: "POST",
        body: formData, // Sending FormData
      });

      if (result.ok) {
        let data = await result.json();
        console.log(data);
        navigate('/products');
      } else {
        throw new Error("Error in adding product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  useEffect(() => {
    const getCategory = async () => {
      try {
        let result = await fetch("http://localhost:5000/api/category");
        if (!result.ok) {
          throw new Error("Error while fetching categories data");
        }
        let data = await result.json();
        console.log(data);
        setCategories(data);
      } catch (error) {
        console.error("Error in fetching categories", error);
      }
    };
    getCategory();
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set image state to the selected file
  };

  return (
    <div>
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form encType="multipart/form-data"> {/* Changed enctype to encType */}
          <div className="content-header d-flex justify-content-between align-items-center">
            <h2 className="content-title">Add Product</h2>
          </div>
          <div className="row mt-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card shadow-sm">
                <div className="card-body">

                  {/* Dropdown for category */}
                  <div className="mb-3">
                    <label htmlFor="product_category" className="form-label">
                      Product Category
                    </label>
                    <select
                      className="form-control"
                      id="product_category"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      required
                    >
                      <option value="" disabled>Select category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.categoryName}
                        </option>
                      ))}
                    </select>

                    {error && !selectedCategory && <div style={{ color: 'red' }}>Select Category</div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="product_name" className="form-label">
                      Product Name
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      style={{ textAlign: 'left' }}
                    />
                    {error && !name && <div style={{ color: 'red' }}>Enter Product name</div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="product_price" className="form-label">
                      Price
                    </label>
                    <input
                      style={{ textAlign: 'left' }}
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      value={price}
                      onChange={(e) => {

                        const enteredValue = parseFloat(e.target.value);

                        const isNegative = enteredValue < 0;

                        setPrice(isNegative ? '' : enteredValue);
                      }}
                      required
                    />
                    {error && !price && <div style={{ color: 'red' }}>Enter product price</div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="product_quantity" className="form-label">
                      Quantity
                    </label>
                    <input
                      style={{ textAlign: 'left' }}
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_quantity"
                      value={quantity}
                      onChange={(e) => {

                        const enteredValue = parseFloat(e.target.value);

                        const isNegative = enteredValue < 0;

                        setQuantity(isNegative ? '' : enteredValue);
                      }}
                      required
                    />
                    {error && !quantity && <div style={{ color: 'red' }}>Enter quantity</div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="product_weight" className="form-label">
                      Weight
                    </label>
                    <input
                      style={{ textAlign: 'left' }}
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_weight"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      required
                    />
                    {error && !weight && <div style={{ color: 'red' }}>Enter weight per product</div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="product_description" className="form-label">
                      Description
                    </label>
                    <textarea
                      placeholder="Write description"
                      className="form-control"
                      id="product_description"
                      rows="7"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    ></textarea>
                    {error && !description && <div style={{ color: 'red' }}>Write product description</div>}
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
                    {error && !image && <div style={{ color: 'red' }}>Insert image</div>}
                  </div>

                  <div className="mb-3 d-flex justify-content-between">
                    <Link to="/products" className="btn btn-danger text-white mr-2">
                      Go to products
                    </Link>
                    <button type="button" onClick={addProduct} className="btn btn-primary">
                      Add Product
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

export default AddProductMain;
