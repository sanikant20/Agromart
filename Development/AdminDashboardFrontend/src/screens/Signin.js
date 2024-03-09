// LoginForm.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signin_Signup.css";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    }, [navigate]);

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
            console.log(result);

            if (result.auth) {
                localStorage.setItem('user', JSON.stringify(result.user));
                localStorage.setItem('token', JSON.stringify(result.auth));
                navigate('/');
            } else {
                setError('Invalid email or password.');
            }
        } catch (error) {
            console.error("Error:", error);
            setError('An error occurred while logging in.');
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div className="page">
                    <div className="cover">
                        
                        <h3>Login</h3>

                        <input
                            type="text"
                            placeholder="username or email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            
                        />

                        <input
                            type="password"
                            placeholder="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            
                        />

                        <button className="btn btn-success login-btn" type="submit">Login</button>

                       
                        {error.includes('Invalid email or password.') && (
                            <p style={{color:"red"}}>Invalid email or password. Please try again.</p>
                        )}
                        {error.includes('Failed to login.') && (
                            <p style={{color:"red"}}>An unexpected error occurred. Please try again later.</p>
                        )}
                        {error.includes('Invalid request.') && (
                            <p style={{color:"red"}}>Invalid request. Please provide both email and password.</p>
                        )}
                        {error.includes('No user found.') && (
                            <p style={{color:"red"}}>No user found with the provided email.</p>
                        )}
                        
                        <p>
                            Don't have an account? <Link to="/signup">Signup</Link>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
