import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signin_Signup.css";

const SignupForm = () => {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userImage, setUserImage] = useState(null);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // Fetch check-email api
    const checkEmailExistence = async () => {
        try {
            const checkResponse = await fetch("http://localhost:5000/api/check-email", {
                method: "POST",
                body: JSON.stringify({ email: email }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const checkJson = await checkResponse.json();
            return checkJson.emailExists;

        } catch (error) {
            console.error("Error checking email existence:", error);
            return false;
        }
    };

    // useEffect to hide signup page when the user is already signed up
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    }, [navigate]);

    const handleSignup = async (e) => {
        e.preventDefault();

        // Email existance
        const emailExists = await checkEmailExistence();

        if (emailExists) {
            alert("Email already exists. Choose a different email address.");
            return;
        }

        // Create new user
        try {
            console.log(name, role, location, email, password, userImage);
            setError('');

            if (!name || !role || !location || !email || !password || !userImage) {
                setError('Please provide all details.');
                return;
            }
            
            // Fetching the server with a POST request for signup
            let result = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                body: JSON.stringify({ name, role, location, email, password, userImage }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            result = await result.json();
            console.log(result);

            localStorage.setItem('user', JSON.stringify(result.result));
            localStorage.setItem('token', JSON.stringify(result.auth));
            navigate('/login');

        } catch (error) {
            console.error("Error:", error);
            setError('An error occurred while registering.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSignup}>
                <div className="page">
                    <div className="cover">
                        <h1>Register</h1>
                        <h3>Signup</h3>
                        <input
                            type="text"
                            placeholder="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="address"
                            name="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="username or email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="file"
                            placeholder="Profile Image"
                            name="userImage"
                            value={userImage}
                            onChange={(e) => setUserImage(e.target.value)}
                        />

                        <div>
                            <label>Choose your role:</label>
                            <select name="role" value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="">Select Role</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>

                        <button className="btn btn-success btn-lg btn-block login-btn" type="submit">Signup</button>

                        {error && <p style={{ color: "red" }}>{error}</p>}

                        <p className="signup">
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignupForm;
