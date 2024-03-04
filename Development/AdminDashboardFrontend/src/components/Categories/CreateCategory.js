import React, { useState } from "react";

const CreateCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryImage, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(false);


    const addCategory = async (e) => {
        e.preventDefault();

        if (!categoryName || !categoryImage || !description) {
            setError(true);
            return;
        }

        try {
            const result = await fetch("http://localhost:5000/api/addCategory", {
                method: "POST",
                body: JSON.stringify({ categoryName, categoryImage ,description }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await result.json();
            console.log(data);
            alert("Category Added successfully.");
            window.location.reload();

            // Reset the form and error state after successful submission
            setCategoryName('');
            setImage('');
            setDescription('');
            setError(false);

        } catch (error) {
            console.error("Error in adding category", error);
        }
    }

    return (
        <div className="col-md-12 col-lg-4">
            <form>
                <div className="mb-4">
                    <label htmlFor="product_name" className="form-label">
                        Name
                    </label>
                    <input 
                        type="text"
                        placeholder="Type here"
                        className="form-control py-3"
                        id="product_name"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                    {error && !categoryName && <div style={{ color: 'red' }}>Enter Category Name</div>}
                </div>

                <div className="mb-4">
                    <label className="form-label">Image</label>
                    <input 
                        type="file"
                        className="form-control py-3"
                        value={categoryImage}
                        onChange={(e) => setImage(e.target.value)}
                    />
                    {error && !categoryImage && <div style={{ color: 'red' }}>Enter Category Name</div>}
                </div>

                <div className="mb-4">
                    <label className="form-label">Description</label>
                    <textarea 
                        placeholder="Type here"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {error && !description && <div style={{ color: 'red' }}>Write description</div>}
                </div>

                <div className="mb-4">
                    <button onClick={addCategory} className="btn btn-primary py-3">Create Category</button>
                </div>
            </form>
        </div>
    )
}

export default CreateCategory;
