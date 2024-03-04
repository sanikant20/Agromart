import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditAdminProfile = () => {
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [role, setRole] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState('')

    const params = useParams();
    const navigate = useNavigate();

    // getting the userID from the local storage
    var userID = JSON.parse(window.localStorage.getItem("user"))._id;

    // Get the admin details for edit
    useEffect(() => {
        const adminProfile = async () => {
            try {
                let result = await fetch(`http://localhost:5000/api/adminProfile/${params.id}`)
                if (!result.ok) {
                    throw new Error(`Failed to fetch product details. Status: ${result.status}`);
                }
                let data = await result.json();
                console.log(data);

                setName(data.name);
                setLocation(data.location);
                setRole(data.role);
                setEmail(data.email);
                setImage(data.image);

            } catch (error) {
                if (error instanceof TypeError) {
                    console.error("Network error. Please check your internet connection.", error);
                } else {
                    console.error("Error fetching product details:", error.message);
                }
            }

        }
        adminProfile();
    }, [])

    // Update the admin details
    const editProfile = async (e) => {
        e.preventDefault(); 
        try {
            let result = await fetch(`http://localhost:5000/api/editProfile/${params.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    name, location, email
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (result.ok) {
                let jsonData = await result.json();
                console.log(jsonData);
                alert("Profile updated");
                navigate(`/adminProfile/${params.id}`);
            } else {
                console.error("Error in updating.");
                alert("Error in update");
            }

        } catch (error) {
            if (error instanceof TypeError) {
                console.error("Network error. Please check your internet connection.", error);
            } else {
                console.error("Error updating admin profile:", error.message);
            }
        }
    };

    return (
        <div>
            <section className="content-main" style={{ maxWidth: "1200px" }}>
                <form>
                    <div className="content-header d-flex justify-content-between align-items-center">

                        <h2 className="content-title">Update Profile</h2>

                    </div>

                    <div className="row mt-4">
                        <div className="col-xl-8 col-lg-8">
                            <div className="card shadow-sm">
                                <div className="card-body">

                                    <div className="mb-3">
                                        <label htmlFor="admin_name" className="form-label">
                                            Name
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="form-control"
                                            id="admin_name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        // readOnly
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="admin_role" className="form-label">
                                            Role
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="form-control"
                                            id="admin_role"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            readOnly
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="form-control"
                                            id="address"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Email
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="form-control"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="profile_image" className="form-label">
                                            Image URL
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Image URL"
                                            className="form-control"
                                            id="profile_image"
                                            value={image}
                                            onChange={(e) => setImage(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3 d-flex justify-content-between">
                                        <Link to={`/adminProfile/` + userID} className="btn btn-danger text-white">
                                            Go to Profile
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={editProfile}
                                            className="btn btn-primary">
                                            Save
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

export default EditAdminProfile;
