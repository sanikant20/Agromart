import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signin_Signup.css";

const SignupForm = () => {
    const [credentials, setCredentials] = useState({ name: "", location: "", email: "", password: "", role: "" });
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name,
                location: credentials.location,
                email: credentials.email,
                password: credentials.password,
                role: credentials.role
            })
        });

        const json = await response.json();
        console.log(json);
        
        if (!json.success) {
            alert("Enter valid credentials...");
        }
        if (json.success) {
            localStorage.setItem("userEmail", credentials.email);
            localStorage.setItem("authToken", json.authToken);
            console.log(localStorage.getItem("authToken"));
            navigate("/login");
        }
    };

   const onChange = (event) => {
  setCredentials({ ...credentials, [event.target.name]: event.target.value });
};


    return (
        <>
            <form onSubmit={handleSignup}>
                <div className="page">
                    <div className="cover">
                        <h1>Register</h1>
                        <h3>Signup</h3>
                        <input type="text" placeholder="name" name="name" value={credentials.name} onChange={onChange} />
                        <input type="text" placeholder="address" name="location" value={credentials.location} onChange={onChange} />
                        <input type="text" placeholder="username or email" name="email" value={credentials.email} onChange={onChange} />
                        <input type="password" placeholder="password" name="password" value={credentials.password} onChange={onChange} />

                        {/* Dropdown for selecting role */}
                        <div>
                            <label>Choose your role:</label>
                            <select name="role" value={credentials.role} onChange={onChange}>
                                <option value="">Select Role</option>
                                <option value="Admin">Admin</option>
                                <option value="Customer">Customer</option>
                            </select>
                        </div>

                        <button className="btn btn-success btn-lg btn-block login-btn" type="submit">Signup</button>
                        <p className="signup">
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </div>
                </div>
            </form>
        </>
    );
};

export default SignupForm;
