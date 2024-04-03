import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddProductMain = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [weight, setWeight] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState('');

  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch api to add new product
  const addProduct = async () => {
    // Validate form fields
    if (!selectedCategory || !name || !price || !quantity || !weight || !description || !image || !selectedSeason) {
      setError('Please fill out all fields');
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
      formData.append('product_image', image);
      formData.append('season', selectedSeason);

      const result = await fetch("http://localhost:5000/api/addProducts", {
        method: "POST",
        body: formData,
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

  // Fetch categories
  useEffect(() => {
    const getCategory = async () => {
      try {
        let result = await fetch("http://localhost:5000/api/category");
        if (!result.ok) {
          throw new Error("Error while fetching categories data");
        }
        let data = await result.json();
        console.log(data);
        setCategories(data.allCategory);
      } catch (error) {
        console.error("Error in fetching categories", error);
      }
    };
    getCategory();
  }, []);

  // Fetch seasons
  useEffect(() => {
    const getSeasons = async () => {
      try {
        let result = await fetch("http://localhost:5000/api/season");
        if (!result.ok) {
          throw new Error("Error while fetching seasons data");
        }
        let data = await result.json();
        console.log(data);
        setSeasons(data);
      } catch (error) {
        console.error("Error in fetching seasons", error);
      }
    };
    getSeasons();
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set image state to the selected file
  };

  return (
    <div>
      <section className="content-main">
        <form encType="multipart/form-data">

          <div className="content-header d-flex justify-content-center">
            <h2 className="content-title">Add Product</h2>
          </div>

          <div className="d-flex justify-content-center">
            <div className="col-xl-8 col-lg-8">
              <div className="card shadow-sm">
                <div className="card-body">

                  <div className="mb-3 row align-items-center">
                    <label htmlFor="product_category" className="col-sm-4 col-form-label">
                      Choose Product Category :
                    </label>
                    <div className="col-sm-8">
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
                      {error && !selectedCategory && <div className="text-danger">Select Category</div>}
                    </div>
                  </div>
                  
                  <div className="mb-3 row align-items-center">
                    <div className="col-sm-4">
                      <label htmlFor="season" className="col-form-label">
                        Choose product season
                      </label>
                    </div>
                    <div className="col-sm-8">
                      <select
                        className="form-control"
                        id="season"
                        value={selectedSeason}
                        onChange={(e) => setSelectedSeason(e.target.value)}
                        required
                      >
                        <option value="" disabled>Select product season</option>
                        {seasons.map((season) => (
                          <option key={season._id} value={season._id}>
                            {season.seasonName}
                          </option>
                        ))}
                      </select>
                      {error && !selectedSeason && <div className="text-danger">Select Season</div>}
                    </div>
                  </div>

                  <div className="mb-3 row align-items-center">
                    <label htmlFor="product_name" className="col-sm-4 col-form-label">
                      Product Name :
                    </label>
                    <div className="col-sm-8">
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
                      {error && !name && <div className="text-danger">Enter Product name</div>}
                    </div>
                  </div>

                  <div className="mb-3 row align-items-center">
                    <label htmlFor="product_name" className="col-sm-4 col-form-label">
                      Product Price :
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id="product_name"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        style={{ textAlign: 'left' }}
                      />
                      {error && !name && <div className="text-danger">Enter Product Price</div>}
                    </div>
                  </div>

                  <div className="mb-3 row align-items-center">
                    <label htmlFor="product_name" className="col-sm-4 col-form-label">
                      Product Quantity :
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id="product_name"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                        style={{ textAlign: 'left' }}
                      />
                      {error && !name && <div className="text-danger">Enter Product Quantity</div>}
                    </div>
                  </div>

                  <div className="mb-3 row align-items-center">
                    <label htmlFor="product_name" className="col-sm-4 col-form-label">
                      Product Weight :
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id="product_name"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        required
                        style={{ textAlign: 'left' }}
                      />
                      {error && !name && <div className="text-danger">Enter Product Weight</div>}
                    </div>
                  </div>

                  <div className="mb-3 row align-items-center">
                    <label htmlFor="product_description" className="col-sm-4 col-form-label">
                      Product Description :
                    </label>
                    <div className="col-sm-8">
                      <textarea
                        placeholder="Write description"
                        className="form-control"
                        id="product_description"
                        rows="2"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      ></textarea>
                      {error && !description && <div style={{ color: 'red' }}>Write product description</div>}
                    </div>
                  </div>


                  <div className="mb-3 row align-items-center">
                    <div className="col-sm-4">
                      <label htmlFor="product_images" className="col-form-label">
                        Select Product Image :
                      </label>
                    </div>
                    <div className="col-sm-8">
                      <input
                        type="file"
                        placeholder="Enter Image from file "
                        className="form-control"
                        name="product_image"
                        id="product_image"
                        onChange={handleImageChange}
                      />
                      {error && !image && <div className="text-danger">Insert image</div>}
                    </div>
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
