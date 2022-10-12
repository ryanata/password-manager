import './LoginForm.css';
import React, { useState } from 'react';

// Create a form component
const LoginForm = () => {
    // Create userId state
    const [userId, setUserId] = useState('');

    // Create a post request to /api/register with async await
    const register = async (email, password) => {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        const data = await response.json();
        console.log(data);
        setUserId(data.userId);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Get value in first input field
        const email = e.target[0].value;
        const password = e.target[1].value;
        register(email, password);
    };

    return (
        <>
            <form className="loginForm" onSubmit={handleSubmit}>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password" />
                <button type="submit">Submit</button>
            </form>
            <p>{userId}</p>
        </>
      );
}
 
export default LoginForm;