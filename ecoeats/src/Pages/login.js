import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../firebaseConfig'; // Update with correct path if needed
import { useNavigate } from 'react-router-dom';
import './login.css'; // Make sure to create this CSS file



function Login() {
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and sign-up
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); // Only for sign-up
    const [message, setMessage] = useState(null); // Success message
    const [error, setError] = useState(null); // Error message
    const navigate = useNavigate(); // For redirection

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous error
        setMessage(null); // Clear previous message

        if (isLogin) {
            // Log in the user
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                console.log("User logged in:", userCredential.user);
                setMessage("Login successful!");
                navigate('/dashboard'); // Redirect to a dashboard page
            } catch (error) {
                setError(error.message); // Display error message
            }
        } else {
            // Sign up the user
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                console.log("User registered:", userCredential.user);
                setMessage("Account created successfully!");
                navigate('/dashboard'); // Redirect to a dashboard page
            } catch (error) {
                setError(error.message); // Display error message
            }
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setEmail('');
        setPassword('');
        setName('');
        setError(null); // Clear errors on toggle
        setMessage(null); // Clear message on toggle
    };

    return (
        <div className="auth-container">
            <h2>{isLogin ? "Welcome Back" : "Create an Account"}</h2>
            <p>{isLogin ? "Please log in to continue." : "Fill out the form to create a new account."}</p>
            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isLogin ? "Login" : "Create Account"}</button>
            </form>
            <p onClick={toggleForm} className="toggle-link">
                {isLogin ? "New here? Create an account" : "Already have an account? Log in"}
            </p>
        </div>
    );
}

export default Login;
