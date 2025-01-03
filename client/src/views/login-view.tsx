import React, { useState } from 'react';
import axios from 'axios';
import './login-view.css';

import user_icon from '../assets/person.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';

const LoginView: React.FC = () => {
    const [action,setAction] = useState("Sign Up");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            const endpoint = action === "Login" ?
                "http://localhost:8080/api/auth/login" :
                "http://localhost:8080/api/auth/signup";

            const payload = action === "Login" ?
                { email: formData.email, password: formData.password } :
                formData;

            const { data } = await axios.post(endpoint, payload);
            console.log(data.message);
            // TODO: Handle successful login/signup (e.g., redirect, store token)
        } catch (error) {
            console.error('Authentication failed:', error);
        }
    };
    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>
            <div className="inputs">
                {action==="Login"?<div></div>:<div className="input">
                    <img src={user_icon} alt="User Icon" />
                    <input 
                    type="text" 
                    name="name"
                    placeholder="Name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    />
                </div>}
                <div className="input">
                    <img src={email_icon} alt="Email Icon" />
                    <input 
                    type="email" 
                    name="email"
                    placeholder="Email ID" 
                    value={formData.email}
                    onChange={handleInputChange}
                    />
                </div>
                <div className="input">
                    <img src={password_icon} alt="Password Icon" />
                    <input 
                    type="password" 
                    name="password"
                    placeholder="Password" 
                    value={formData.password}
                    onChange={handleInputChange}
                    />
                </div>
            </div>
            {action==="Sign Up" ? <div></div> : 
                <div className="forgot-password">Lost Password? <span>Click Here!</span></div>}
                <div className="submit-container">
                    <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
                    <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
                </div>
                <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default LoginView;