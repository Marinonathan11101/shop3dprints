import { useState } from 'react';
import Nav from "../routes/nav/nav.component";
import Footer from "./footer";
import "../App.css";

const AddProductForm = () => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImageUrls, setProductImageUrls] = useState([]); // Changed to an array for multiple images
    const [imageInput, setImageInput] = useState(''); // For single image input field
    const [productCategory, setCategory] = useState('coaster');
    const [productMedia, setMedia] = useState('Marvel');
    const [productColors, setProductColors] = useState([]);
    const [productDimensions, setDimensions] = useState('');
    const [hasColorOptions, setColorOptions] = useState(false);

    const handleAddImage = () => {
        if (imageInput.trim()) {
            setProductImageUrls([...productImageUrls, imageInput.trim()]);
            setImageInput(''); // Clear the input field after adding
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = {
            name: productName,
            description: productDescription,
            imageURL: productImageUrls, // Send the array of image URLs
            price: productPrice,
            category: productCategory,
            media: productMedia,
            colors: productColors,
            dimensions: productDimensions,
            hasColorOptions: hasColorOptions
        };

        try {
            const response = await fetch('https://shop3dprints.onrender.com/products/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            if (response.ok) {
                const data = await response.json();
                alert('Product added successfully');
                console.log('Product added:', data);
            } else {
                console.error('Failed to add product');
                alert('Failed to add product to the database');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <body className='bodyContainer'>
            <Nav />
            <h2>Add a New Product</h2>
            <div className='addProductForm'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Product Name:</label>
                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Price:</label>
                        <input
                            type="number"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Image URLs:</label>
                        <input
                            type="text"
                            value={imageInput}
                            onChange={(e) => setImageInput(e.target.value)}
                        />
                        <button type="button" onClick={handleAddImage}>Add Image</button>
                        <div>
                            <h4>Added Images:</h4>
                            <ul>
                                {productImageUrls.map((url, index) => (
                                    <li key={index}>{url}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <label>Category:</label>
                        <select value={productCategory} onChange={(e) => setCategory(e.target.value)}>
                            <option value="coaster">Coaster</option>
                            <option value="keychain">Keychain</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label>Media:</label>
                        <select value={productMedia} onChange={(e) => setMedia(e.target.value)}>
                            <option value="Marvel">Marvel</option>
                            <option value="DC">DC</option>
                            <option value="Sports">Sports</option>
                            <option value="Cars">Cars</option>
                            <option value="Food">Food</option>
                            <option value="Pokemon">Pokemon</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label>Colors:</label>
                        <div className="color-options">
                            {["Red", "Blue", "Black", "White", "Orange", "Yellow", "Green", "Brown", "Gold", "Silver", "Grey", "Other"].map((colors) => (
                                <label key={colors}>
                                    <input
                                        type="checkbox"
                                        value={colors}
                                        checked={productColors.includes(colors)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setProductColors([...productColors, colors]);
                                            } else {
                                                setProductColors(productColors.filter((c) => c !== colors));
                                            }
                                        }}
                                    />
                                    {colors}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label>Dimensions:</label>
                        <input
                            type="text"
                            value={productDimensions}
                            onChange={(e) => setDimensions(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Color Options?</label>
                        <input
                            type="checkbox"
                            checked={hasColorOptions}  // Set checked based on the current state
                            onChange={() => setColorOptions(!hasColorOptions)}  // Toggle the state
                        />
                        {hasColorOptions ? "Yes" : "No"}
                    </div>
                    <button type="submit">Add Product</button>
                </form>
            </div>
            <Footer />
        </body>
    );
};

export default AddProductForm;