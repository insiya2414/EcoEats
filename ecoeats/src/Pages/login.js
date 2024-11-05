// import React, { useState } from 'react';

// function Login() {
//     const [isLogin, setIsLogin] = useState(true); // Toggle between login and sign-up
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [name, setName] = useState(''); // Only for sign-up

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (isLogin) {
//             // Login logic (to be integrated with Firebase later)
//             console.log("Logging in with:", { email, password });
//         } else {
//             // Sign-up logic (to be integrated with Firebase later)
//             console.log("Signing up with:", { name, email, password });
//         }
//     };

//     const toggleForm = () => {
//         setIsLogin(!isLogin);
//         setEmail('');
//         setPassword('');
//         setName('');
//     };

//     return (
//         <div className="auth-container">
//             <h2>{isLogin ? "Welcome Back" : "Create an Account"}</h2>
//             <p>{isLogin ? "Please log in to continue." : "Fill out the form to create a new account."}</p>
//             <form onSubmit={handleSubmit}>
//                 {!isLogin && (
//                     <input
//                         type="text"
//                         placeholder="Name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                     />
//                 )}
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <button type="submit">{isLogin ? "Login" : "Create Account"}</button>
//             </form>
//             <p onClick={toggleForm} className="toggle-link">
//                 {isLogin ? "New here? Create an account" : "Already have an account? Log in"}
//             </p>
//         </div>
//     );
// }

// export default Login;

// src/Login.js
import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../firebaseConfig';

function Login() {
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and sign-up
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); // Only for sign-up
    const [error, setError] = useState(null); // To display any errors

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous error

        if (isLogin) {
            // Log in the user
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                console.log("User logged in:", userCredential.user);
            } catch (error) {
                setError(error.message); // Display error message
            }
        } else {
            // Sign up the user
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                console.log("User registered:", userCredential.user);
                // You can save the `name` or other info in Firestore if needed
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
    };

    return (
        <div className="auth-container">
            <h2>{isLogin ? "Welcome Back" : "Create an Account"}</h2>
            <p>{isLogin ? "Please log in to continue." : "Fill out the form to create a new account."}</p>
            {error && <p className="error-message">{error}</p>}
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
