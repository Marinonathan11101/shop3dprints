export const isAuthenticated = () => { // checks to see if the user is authenticated (logged in)
    const token = localStorage.getItem('authToken');
    console.log(token);
    if (!token) {
        console.log("No token");
        return false; // No token means the user is not authenticated
        
    }

    // Optionally, verify the token with the backend
    try {
        return true; // Check if the token is still valid
    } catch (error) {
        console.error('Invalid token:', error);
        return false; // If decoding or validation fails
    }
};