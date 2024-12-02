import '../../App.css';
import logo from "../../images/logo.png";
import searchIcon from "../../images/searchBar.png";
import cartIcon from "../../images/cart.png";
import heartIcon from "../../images/heart.png";
import signInIcon from "../../images/signin.png";
import threedots from "../../images/3dots.png";
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import SignInForm from '../../components/sign-up-form.component';
import { jwtDecode } from 'jwt-decode';
import { itemTotal } from '../../cart/cartHelper';
import { ClearCart } from '../../cart/cartHelper';

function Nav({ scrollToProducts }) {

    const [authToken, setAuthToken] = useState(null);
    const [userName, setUserName] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const productsSectionRef = useRef(null);


    // const scrollToProducts = () => {
    //     productsSectionRef.current.scrollIntoView({
    //         behavior: 'smooth',
    //         block: 'start'
    //     });
    // };

    const navigate = useNavigate();  // To redirect user after logging out

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle menu state
    };

    const getUserRole = () => {
        const token = localStorage.getItem("authToken");
        if (!token) return null;

        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);  // This will log the decoded token
        console.log("Is Admin:", decodedToken.isAdmin);  // This will log the isAdmin value
        return decodedToken.isAdmin;
    };

    useEffect(() => {
        // Check if there is an auth token in localStorage
        const token = localStorage.getItem('authToken');
        const name = localStorage.getItem('userName'); // Get user's name
    
        if (token) {
            setAuthToken(token); // If the token exists, set authToken state
            setUserName(name);
            
            // Fetch the user's role from the token directly
            const role = getUserRole();
            console.log('Role:', role); // This will log the role fetched from the token
            if (role !== null) {
                setIsAdmin(role); // Set the state based on decoded token
            }
        }
    }, []);

    const fetchProductByName = async (e) => {
        const name = e.target.value;
        var input = document.querySelector("input");

        // If the search bar is empty, display all products
        if (name.trim() === "") {
            try {
                const response = await fetch('https://shop3dprints.onrender.com/products'); // Fetch all products
                if (response.ok) {
                    const data = await response.json();
                    navigate("/", { state: { filteredProductsByName: [], filteredProducts: data } }); // Pass all products to state
                } else {
                    console.error("Failed to fetch all products");
                }
            } catch (error) {
                console.error("Error fetching all products:", error);
            }
            return;
        }

        // Otherwise, fetch products by name
        try {
            const response = await fetch(`https://shop3dprints.onrender.com/products/names?name=${name.toUpperCase()}`);
            if (response.ok) {
                const data = await response.json();
                navigate("/", { state: { filteredProductsByName: data } });
            } else {
                console.error("Failed to fetch product by name");
            }
        } catch (error) {
            console.error("Error fetching product by name:", error);
        }

        input.addEventListener("keypress", function (event) {
            // If the user presses the "Enter" key on the keyboard
            if (event.key === "Enter") {
                // Cancel the default action, if needed
                event.preventDefault();
                scrollToProducts();

            }
        });

    }




const FetchProductsByCategory = async (media, category) => {
    // Ensure that media and category values are correct and in uppercase/lowercase
    // based on how they are stored in your database (case-sensitive)

    try {
        // Construct the URL with the query parameters
        console.log(media, category);
        const response = await fetch(`https://shop3dprints.onrender.com/products/filter?media=${media}&category=${category}`)


        if (response.ok) {
            const data = await response.json();
            console.log("Fetched data:", data);
            navigate("/", { state: { filteredProducts: data } });
        } else {
            console.error('Failed to fetch filtered products, status code:', response.status);
            const errorMessage = await response.text(); // Capture error message
            console.error(errorMessage);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};




const handleLogout = () => {
    // Remove the user-related data from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    ClearCart();

    // Redirect user to the login page or home page after logout
    navigate('/signin');
};

const handleCategoryClick = (media, category) => {
    console.log(`You clicked on ${media} ${category}`);
    FetchProductsByCategory(media, category);

};


return (
    <header>
        <div className="headerDiv">
            <div className="Categories" onClick={toggleMenu}>
                <img src={threedots} alt="Categories" />
                <p>CATEGORIES</p>
            </div>
            {/* Side menu */}
            <div className={`sideMenu ${isMenuOpen ? 'open' : ''}`}>
                <div className="sideMenuContent">

                    <div>

                        <h3>All</h3>
                        <ul>
                            <li><a href="#" onClick={() => handleCategoryClick("All", "All")}>Click to View All</a></li>
                        </ul>

                    </div>
                    <div>
                        <h3>Coasters</h3>
                        <ul>
                            <li><a href="#" onClick={() => handleCategoryClick("Marvel", "coaster")}>Marvel</a></li>
                            <li><a href="#" onClick={() => handleCategoryClick("DC", "coaster")}>DC</a></li>
                            <li><a href="#" onClick={() => handleCategoryClick("Sports", "coaster")}>Sports</a></li>
                            <li><a href="#" onClick={() => handleCategoryClick("Cars", "coaster")}>Cars</a></li>
                            <li><a href="#" onClick={() => handleCategoryClick("Food", "coaster")}>Food</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3>Keychains</h3>
                        <ul>
                            <li><a href="#" onClick={() => handleCategoryClick("Marvel", "keychain")}>Marvel</a></li>
                            <li><a href="#" onClick={() => handleCategoryClick("DC", "keychain")}>DC</a></li>
                            <li><a href="#" onClick={() => handleCategoryClick("Sports", "keychain")}>Sports</a></li>
                            <li><a href="#" onClick={() => handleCategoryClick("Cars", "keychain")}>Cars</a></li>
                            <li><a href="#" onClick={() => handleCategoryClick("Food", "keychain")}>Food</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="LogoAndImage">
                <Link to={"/"}>
                    <img src={logo} alt="Shop 3D prints logo" />
                </Link>
            </div>

            <div className="title">
                <h1>SHOP 3D PRINTS</h1>
                <div className="SearchBar">
                    <input type="text" placeholder="Search.." onChange={(e) => fetchProductByName(e)} />
                    <div>
                        <img src={searchIcon} alt="Search Icon" className="search-icon" />
                    </div>
                </div>
            </div>

            <div className="cart-Likes-SignIn">
                <div className="Cart">
                    <Link className="CartLink" to={"/cart"}>
                        <img src={cartIcon} alt="Cart Icon" />
                        <p>CART</p>
                        {(
                            <span className="cart-badge">{itemTotal()}</span>
                        )}
                    </Link>
                </div>


                <div className="Likes">
                    <Link className='LikeLink' to={"/likes"}>
                        <img src={heartIcon} alt="Image of a heart" />
                        <p>LIKES</p>
                    </Link>
                </div>

                <div>
                    {isAdmin &&
                        <Link to={"/adminproducts"}>
                            <p>Products</p>
                        </Link>
                    }
                </div>

                <div className="Sign-In">
                    {authToken ? (
                        <div>
                            <p>Welcome, {userName}</p>
                            <button className='logOutButton' onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <div>
                        <Link className='SignInLink' to={"/signIn"}>
                            <img src={signInIcon} alt="Image to sign in" />
                            <p>SIGN IN</p>
                        </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </header>

);
};

export default Nav;