import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ChangePasswordMain = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [oldPasswordError, setOldPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // getting the userID from the local storage
    const user = JSON.parse(window.localStorage.getItem("user"));
    const userID = user ? user._id : '';

    const email = user ? user.email : '';

    const changePassword = async () => {
        try {
            if (!oldPassword) {
                setOldPasswordError("Please enter old password");
                return;
            } else {
                setOldPasswordError("");
            }
            if (!newPassword) {
                setNewPasswordError("Please enter new password");
                return;
            } else {
                setNewPasswordError("");
            }

            const response = await fetch("http://192.168.56.1:5000/api/changeUserPassword", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, oldPassword, newPassword })
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }

            const result = await response.json();
            console.log("Password change result:", result);
            setOldPassword('');
            setNewPassword('');
            setOldPasswordError('');
            setNewPasswordError('');

            navigate(`/adminProfile/${userID}`);
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    return (
        <div>
            <section className="content-main">
                <form>
                    <div className="content-header d-flex justify-content-center">
                        <h2 className="content-title">Change Password</h2>
                    </div>

                    <div className="d-flex justify-content-center">
                        <div className="col-xl-8 col-lg-8">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    {errorMessage && (
                                        <div className="alert alert-danger" role="alert">
                                            {errorMessage}
                                        </div>
                                    )}
                                    <div className="mb-3 d-flex align-items-center">
                                        <label htmlFor="oldPassword" className="col-sm-4 col-form-label">
                                            Old Password:
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="Enter old password"
                                            className="form-control"
                                            id="oldPassword"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            style={{ textAlign: 'left' }}
                                        />
                                    </div>
                                    {oldPasswordError && (
                                        <p className="text-danger">{oldPasswordError}</p>
                                    )}

                                    <div className="mb-3 d-flex align-items-center">
                                        <label htmlFor="new_password" className="col-sm-4 col-form-label">
                                            New Password:
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="Enter new password"
                                            className="form-control"
                                            id="new_password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            style={{ textAlign: 'left' }}
                                        />
                                    </div>
                                    {newPasswordError && (
                                        <p className="text-danger">{newPasswordError}</p>
                                    )}

                                    <div className="mb-3 d-flex justify-content-between">
                                        <Link
                                            to={`/adminProfile/${userID}`}
                                            className="btn btn-danger text-white">
                                            Go to Profile
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={changePassword}
                                            className="btn btn-primary">
                                            Save Password
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
}

export default ChangePasswordMain;
