import Footer from './footer';
import '../App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from "../routes/nav/nav.component"


const SignInForm = () => {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const navigate = useNavigate();

    const validatePassword = (password) => {
        // Password must be at least 8 characters long and contain at least one number
        const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
        return passwordPattern.test(password);
    };

    const validatePostalCode = (postalCode) => {
        const postalCodePattern = /[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d/;
        return postalCodePattern.test(postalCode);
    }

    // These useState calls create state variables for each form field, initializing them as empty strings.
    // Each variable (displayName, email, password, confirmPassword) holds the input value for its respective field, while the associated set... functions allow you to update these values.

    const handleSubmit = async (e) => { // handleSubmit is an asynchronous function triggered when the form is submitted.
        e.preventDefault(); // e.preventDefault() stops the page from reloading, which is the default form behavior, allowing you to handle submission in JavaScript.

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return; // return exits the function
        }

        if (!validatePassword(password)) {
            alert("Password must be at least 8 characters long and contain at least one number.");
            return; // Exit if password doesn't meet requirements
        }

        if (!validatePostalCode(postalCode)){
            alert("Invalid postal code")
        }

        const newUser = { displayName, email, password, shippingAddress, postalCode, country, city };

        try {
            const response = await fetch('https://shop3dprints.onrender.com/api/signup', { // sends the new user data to the server
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            // This uses the fetch API to send the newUser data to the server at http://localhost:5000/api/signup using a POST request.
            // headers specifies that the request body is in JSON format.
            // body: JSON.stringify(newUser) converts the newUser object to a JSON string for transmission.

            const data = await response.json();

            if (response.ok) {
                setDisplayName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setShippingAddress('');
                setPostalCode('');
                setCountry('');
                setCity('');
                alert("User created successfully");
            }
            else {
                alert(data.message);
            }
        } catch (err) {
            console.error(err);
            alert('Server error');
        }


    }

    const handleSignInSubmit = async (e) => {
        e.preventDefault();

        const userCredentials = { email, password };

        try {
            const response = await fetch('https://shop3dprints.onrender.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userCredentials), // Send email and password to backend
            });

            const data = await response.json();

            if (response.ok) {
                // If login is successful, save the token to localStorage (or cookie)
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('userName', data.displayName);
                setEmail('');
                setPassword('');
                navigate("/");
                alert("Login successful");
                // You can redirect the user to another page or update the UI state
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error(err);
            alert('Server error');
        }
    };

    return (
        <body>
        <div className='SignInPage'>
            <div className="signInContainer">
                <div className="AlreadyHaveAccount">
                    <h2>I already have an account</h2>
                    <p>Sign in with your email and password</p>
                    <form onSubmit={handleSignInSubmit}>
                        <div className="EmailForm">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} // Bind email state
                                required
                            />
                        </div>

                        <div className='PasswordForm'>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} // Bind password state
                                required
                            />
                        </div>

                        <div className='buttonContainerAHA'>
                            <button type="submit">Sign In</button>
                        </div>
                    </form>
                </div>

                <div className='DHAContainer'>
                    <h2>I do not have an account</h2>
                    <p>Sign up with your email and password</p>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="displayName">Display Name:</label>
                            <input
                                type="text"
                                id="displayName"
                                name="displayName"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)} // Bind displayName state
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="emailRegister">Email:</label>
                            <input
                                type="email"
                                id="emailRegister"
                                name="emailRegister"
                                value={email} // Bind email state
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                title="Enter a valid email address"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="passwordRegister">Password:</label>
                            <input
                                type="password"
                                id="passwordRegister"
                                name="passwordRegister"
                                value={password} // Bind password state
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword">Confirm Password:</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={confirmPassword} // Bind confirmPassword state
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="shippingAddress">Shipping Address:</label>
                            <input
                                type="text"
                                id="shippingAddress"
                                name="shippingAddress"
                                value={shippingAddress} // Bind confirmPassword state
                                onChange={(e) => setShippingAddress(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="postalCode">Postal Code:</label>
                            <input
                                type="text"
                                id="postalCode"
                                name="postalCode"
                                value={postalCode} // Bind confirmPassword state
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="country">Country:</label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                value={country} // Bind confirmPassword state
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="city">City:</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={city} // Bind confirmPassword state
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className='buttonContainerDHA'>
                            <button type="submit">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
        <Footer />
    </body>
    );

}

export default SignInForm;