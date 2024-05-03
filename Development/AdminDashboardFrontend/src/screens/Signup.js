import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupForm = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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

        // Email existence check
        const emailExists = await checkEmailExistence();
        if (emailExists) {
            setError("Email or username already taken.");
            return;
        }
        // Password length check
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }
        // Create new user
        try {
            setError('');

            if (!name || !location || !email || !password) {
                setError('Please provide all details.');
                return;
            }

            // Fetching the server with a POST request for signup
            const result = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                body: JSON.stringify({ name, role: 'admin', location, email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await result.json();
            localStorage.setItem('user', JSON.stringify(data.result));
            localStorage.setItem('token', JSON.stringify(data.auth));
            navigate('/login');

        } catch (error) {
            console.error("Error:", error);
            setError('An error occurred while registering.');
        }
    };

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSignup}>
                <div className="Auth-form-content">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                        <img src="/Green-Splash.png"
                            className="logo"
                            alt="Agromart Logo "
                            style={{ height: "100px", width: "100px" }}
                        />
                    </div>
                    <h3 className="Auth-form-title">Sign Up</h3>
                    <div className="form-group mt-3">
                        <label>Name</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control mt-1"
                            placeholder="Enter name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Address</label>
                        <input
                            type="text"
                            id="location"
                            className="form-control mt-1"
                            placeholder="Enter address"
                            name="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email or Username</label>
                        <input
                            type="text"
                            id="email"
                            className="form-control mt-1"
                            placeholder="Enter email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <p className="forgot-password text-right mt-2">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default SignupForm;
