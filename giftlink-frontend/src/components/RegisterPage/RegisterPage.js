import React, { useState } from 'react';
// NEW: Import useNavigate and your AppContext
import { useNavigate } from 'react-router-dom'; 
import { useAppContext } from '../context/AppContext'; // Update this path if your context file is located elsewhere
import './RegisterPage.css';

function RegisterPage() {

    // Existing state variables
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // NEW: Create state to hold the error message
    const [showerr, setShowerr] = useState(''); 

    // NEW: Initialize navigate and context
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAppContext();

    // Updated handleRegister function
    const handleRegister = async () => {
        console.log("Register invoked");
        
        try {
            // --- {Code from Step 1} ---
            // Example of what Step 1 likely looks like:
            const response = await fetch("YOUR_BACKEND_REGISTER_URL", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstName, lastName, email, password })
            });

            // Task 1: Access data coming from fetch API
            const json = await response.json();

            // Task 2: Set user details
            if (json.authtoken) {
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', firstName);
                sessionStorage.setItem('email', json.email);
                
                // Task 3: Set the state of user to logged in using useAppContext
                setIsLoggedIn(true);
                
                // Task 4: Navigate to the MainPage after logging in
                navigate('/app');
            } 
            // Task 5: Set an error message if the registration fails
            else if (json.error) {
                setShowerr(json.error);
            }
        } catch (error) {
            console.error("Registration error:", error);
            setShowerr("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="register-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Register</h2>

                        {/* Input elements for all variables */}
                        <div className="mb-4">
                            <label htmlFor="firstName" className="form-label">First Name</label><br />
                            <input
                                id="firstName"
                                type="text"
                                className="form-control"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="lastName" className="form-label">Last Name</label><br />
                            <input
                                id="lastName"
                                type="text"
                                className="form-control"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="form-label">Email</label><br />
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">Password</label><br />
                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Task 6: Display error message to end user */}
                        {/* Placing it right above the button is standard practice */}
                        {showerr && (
                            <div className="text-danger mb-3">{showerr}</div>
                        )}

                        {/* Button that performs the `handleRegister` function on click */}
                        <button className="btn btn-primary w-100 mb-3" onClick={handleRegister}>
                            Register
                        </button>

                        <p className="mt-4 text-center">
                            Already a member? <a href="/app/login" className="text-primary">Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;