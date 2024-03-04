import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ChangePasswordMain = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const params = useParams();

    // getting the userID from the local storage
    var userID = JSON.parse(window.localStorage.getItem("user"))._id;
    var email = JSON.parse(window.localStorage.getItem("user")).email;

    const changePassword = async () => {
        // Password validation
        if (!oldPassword || !newPassword || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("New password and confirm password doesn't match")
            return
        }

        try {
            // Check if the entered old password matches the current password
            const checkOldPasswordResponse = await fetch("http://localhost:5000/api/checkOldPassword", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, oldPassword })
            });

            // if (!checkOldPasswordResponse.ok) {
            //     console.error("Error checking old password.");
            //     return;
            // }

            const checkOldPasswordResult = await checkOldPasswordResponse.json();

            if (!checkOldPasswordResult.passwordMatch) {
                setError("Old password is incorrect");
                return;
            }
        } catch {
            console.error("Error", error)
        }
        try {
            // Continue with the password change
            const response = await fetch(`http://localhost:5000/api/changePassword/${params.id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, oldPassword, newPassword, confirmPassword })
            });

            if (!response.ok) {
                console.error("Error fetching API.");
                return;
            }

            const result = await response.json();

            console.log("Password change result:", result);

            // Reset the input fields after a successful password change if needed
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setError('');

            // Navigate to adminProfile page after successful password change
            navigate(`/adminProfile/${userID}`);
        } catch (error) {
            console.error("Error", error);
        }
    }

    return (
        <div>
            <section className="content-main" style={{ maxWidth: "1200px" }}>
                <form>
                    <div className="content-header d-flex justify-content-between align-items-center">

                        <h2 className="content-title">Change Password</h2>

                    </div>

                    <div className="row mt-4">
                        <div className="col-xl-8 col-lg-8">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label htmlFor="oldPassword" className="form-label">
                                            Old Password
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="Enter old password"
                                            className="form-control"
                                            id="oldPassword"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="new_password" className="form-label">
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="Enter new password"
                                            className="form-control"
                                            id="new_password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="confirm_password" className="form-label">
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="Confirm new password"
                                            className="form-control"
                                            id="confirm_password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>

                                    {error && (
                                        <p style={{ color: "red" }}>{error}</p>
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
