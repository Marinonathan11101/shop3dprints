import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from './footer';
import Nav from '../routes/nav/nav.component';
import "../App.css";

function EditProduct() {
    const { id } = useParams();  // Get the product ID from the URL
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        price: '',
        imageUrl: '',
        colors: [],
        category: '',
        media: '',
        dimensions: ''
    });

    const availableColors = [
        'Red', 'Blue', 'Black', 'White', 'Orange', 
        'Yellow', 'Green', 'Brown', 'Gold', 'Silver', 'Grey', 'Other'
    ];

    const handleColorChange = (e) => {
        const { value, checked } = e.target;

        setProduct((prevProduct) => {
            const updatedColors = checked
                ? [...prevProduct.colors, value] // Add color
                : prevProduct.colors.filter((color) => color !== value); // Remove color
            return { ...prevProduct, colors: updatedColors };
        });
    };

    const [loading, setLoading] = useState(true);

    // Fetch the product by its ID
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://shop3dprints.onrender.com/products/${id}`, {
                    method: 'GET', 
                });
          
                if (response.ok) {
                    const data = await response.json();
                    setProduct({ ...data, colors: data.colors || [] }); // Ensure colors is an array
                } else {
                    console.error('Failed to fetch product');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSaveEdit = async () => {
        try {
            const response = await fetch(`https://shop3dprints.onrender.com/products/${id}/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),  // Send updated product data
            });

            if (response.ok) {
                navigate('/');  // Redirect to the Home page after successful update
            } else {
                console.error('Failed to update product');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <body className='editProductContainer'>
            <div>
                <Nav />
                <h2>Edit Product</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Price:
                        <input
                            type="text"
                            name="price"
                            value={product.price}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Image URL:
                        <input
                            type="text"
                            name="imageUrl"
                            value={product.imageUrl}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Colors:
                        <div>
                            {availableColors.map((color) => (
                                <label key={color}>
                                    <input
                                        type="checkbox"
                                        value={color}
                                        checked={product.colors.includes(color)} 
                                        onChange={handleColorChange}
                                    />
                                    {color}
                                </label>
                            ))}
                        </div>
                    </label>

                    <label>Media:</label>
                    <select name="media" value={product.media} onChange={handleInputChange}>
                        <option value="Marvel">Marvel</option>
                        <option value="DC">DC</option>
                        <option value="Sports">Sports</option>
                        <option value="Cars">Cars</option>
                        <option value="Food">Food</option>
                        <option value="Pokemon">Pokemon</option>
                        <option value="Other">Other</option>
                    </select>

                    <label>Category:</label>
                    <select name="category" value={product.category} onChange={handleInputChange}>
                        <option value="coaster">Coaster</option>
                        <option value="keychain">Keychain</option>
                        <option value="other">Other</option>
                    </select>

                    <label>
                        Dimensions:
                        <input
                            type="text"
                            name="dimensions"
                            value={product.dimensions}
                            onChange={handleInputChange}
                        />
                    </label>


                    <button type="submit">Save Changes</button>
                </form>
                <Footer />
            </div>
        </body>
    );
}

export default EditProduct;