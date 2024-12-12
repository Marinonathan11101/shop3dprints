const express = require('express');
const Product = require('../models/Product'); 

const router = express.Router();

// Specific routes first
router.get('/filter', async (req, res) => {
    const { media, category } = req.query;
    console.log('Filter params:', media, category);

    const filter = {};
    if (media) filter.media = media; // Filter by mediaName if provided
    if (category) filter.category = category; // Filter by categoryName if provided

    try {
        const products = await Product.find(filter);
        console.log("Products found:", products);
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products' });
    }
});

router.get('/names', async (req, res) => {
    const name = req.query.name;
    console.log("Received query name:", name);

    if (!name) {
        return res.status(400).json({ message: "Name parameter is required" });
    }
    try {
        const products = await Product.find({
            name: { $regex: name, $options: 'i' }
        });
        console.log("Products found:", products);
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Error fetching products" });
    }
});

router.post("/add", async (req, res) => {
    const { name, description, imageURL, price, category, media, colors, dimensions, hasColorOptions, hasUserInput } = req.body;

    console.log(req.body.imageURL);

    try {
        const newProduct = new Product({
            name,
            description,
            imageURL,
            price,
            category,
            media,
            colors,
            dimensions,
            hasColorOptions,
            hasUserInput

        });

        await newProduct.save();

        res.status(201).json({
            message: 'Product added successfully',
            product: newProduct
        });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({
            error: 'Failed to add product'
        });
    }
});

router.put('/:id/update', async (req, res) => {
    try {
        const updatedProduct = req.body;
        const product = await Product.findByIdAndUpdate(req.params.id, updatedProduct, { new: true });

        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        res.status(500).send({ message: 'Failed to update product' });
    }
});

// Dynamic route for specific product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Failed to fetch product' });
    }
});

router.delete("/:id/delete", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete product" });
    }
});

// General route last
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

module.exports = router;