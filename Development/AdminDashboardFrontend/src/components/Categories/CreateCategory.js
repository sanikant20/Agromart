import React from "react";

const CreateCategory = () => {
    return (
        <div className="col-md-12 col-lg-4">
            <form>
                <div className="mb-4">
                    <label htmlFor="product_name" className="form-label">
                        Name
                    </label>
                    <input type="text" placeholder="Type here" className="form-control py-3" id="product_name" />
                </div>

                <div className="mb-4">
                    <label className="form-label">Image</label>
                    <input type="file" className="form-control py-3" />
                </div>

                <div className="mb-4">
                    <label className="form-label">Description</label>
                    <textarea placeholder="Type here" className="form-control"></textarea>
                </div>

                <div className="mb-4">
                    <label className="btn btn-primary py-3">Create Category</label>
                </div>
            </form>
        </div>
    )
}

export default CreateCategory;
