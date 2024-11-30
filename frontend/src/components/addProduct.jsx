import { useState } from 'react';
import Nav from "../routes/nav/nav.component"
import Footer from "./footer"
import "../App.css";

const AddProductForm = () => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImageUrl, setProductImageUrl] = useState('');
    const [productCategory, setCategory] = useState('coaster');  // Default category
    const [productMedia, setMedia] = useState('Marvel');
    const [productColors, setProductColors] = useState([]); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = {
            name: productName,
            description: productDescription,
            imageURL: productImageUrl,
            price: productPrice,
            category: productCategory,
            media: productMedia,
            colors: productColors
        };

        try {
            const response = await fetch('http://localhost:5000/products/add', {
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
                        <label>Image URL:</label>
                        <input
                            type="text"
                            value={productImageUrl}
                            onChange={(e) => setProductImageUrl(e.target.value)}
                            required
                        />
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
                            {["Red", "Blue", "Black", "White", "Orange", "Pink", "Yellow", "Green", "Brown", "Other"].map((colors) => (
                                <label key={colors}>
                                    <input
                                        type="checkbox"
                                        value={colors}
                                        checked={productColors.includes(colors)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setProductColors([...productColors, colors]); // Add color
                                            } else {
                                                setProductColors(productColors.filter((c) => c !== colors)); // Remove color
                                            }
                                        }}
                                    />
                                    {colors}
                                </label>
                            ))}
                        </div>
                    </div>
                    <button type="submit">Add Product</button>
                </form>
            </div>
            <Footer />
        </body>


    );
};

export default AddProductForm;