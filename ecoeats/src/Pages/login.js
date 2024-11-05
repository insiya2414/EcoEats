import React, { useState } from 'react';

function Login() {
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and sign-up
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); // Only for sign-up

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            // Login logic (to be integrated with Firebase later)
            console.log("Logging in with:", { email, password });
        } else {
            // Sign-up logic (to be integrated with Firebase later)
            console.log("Signing up with:", { name, email, password });
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setEmail('');
        setPassword('');
        setName('');
    };

    return (
        <div className="auth-container">
            <h2>{isLogin ? "Welcome Back" : "Create an Account"}</h2>
            <p>{isLogin ? "Please log in to continue." : "Fill out the form to create a new account."}</p>
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
