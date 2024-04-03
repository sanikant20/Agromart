import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setError('');

            if (!email || !password) {
                setError('Please provide both email and password.');
                return;
            }

            const response = await fetch("http://localhost:5000/api/login", {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();

            if (response.ok) {
                if (result.auth) {
                    // Check user role here
                    if (result.user.role === 'admin') {
                        localStorage.setItem('user', JSON.stringify(result.user));
                        localStorage.setItem('token', JSON.stringify(result.auth));
                        navigate('/');
                    } else {
                        setError('Invalid user role.');
                    }
                } else {
                    setError('Invalid email or password.');
                }
            } else {
                // Handle server errors
                if (result && result.result) {
                    setError(result.result);
                } else {
                    setError('An unexpected error occurred. Please try again later.');
                }
            }
        } catch (error) {
            console.error("Error:", error);
            setError('An error occurred while logging in.');
        }
    };

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className="Auth-form-container">

            <form className="Auth-form" onSubmit={handleLogin}>
                <div className="Auth-form-content">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                        <img src="/logo.jpg"
                            className="logo"
                            alt="Agromart Logo "
                            style={{ height: "100px", width: "100px" }}
                        />
                    </div>
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="form-group mt-3">
                        <label>Email or Username</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="Enter email or username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
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
                        Don't have account? <Link to="/signup">Register</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
