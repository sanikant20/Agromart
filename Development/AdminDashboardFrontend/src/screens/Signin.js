// LoginForm.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signin_Signup.css";

const LoginForm = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        let response = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            })
        });
        const json = await response.json();

        if (!json.success) {
            alert("Enter valid credentials!!");
        }
        if (json.success) {
            localStorage.setItem("userEmail", credentials.email);
            localStorage.setItem("authToken", json.authToken);
            console.log(localStorage.getItem("authToken"));

            navigate("/");
        }
    };

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div className="page">
                    <div className="cover">
                        <h1>Register</h1>
                        <h3>Login</h3>
                        <input type="text" placeholder="username or email"
                            name="email" value={credentials.email} onChange={onChange} />

                        <input type="password" placeholder="password"
                            name="password" value={credentials.password} onChange={onChange} />

                        {/* <div className="login-btn">Login</div> */}
                        <button className="btn btn-success login-btn" type="submit">Login</button>
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
