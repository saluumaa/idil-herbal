const Product = require('../models/Product.js');

const getProducts = async (req, res) => {
    try {
      const { page = 1, limit = 10, search = '', category, minPrice, maxPrice } = req.query;
      const skip = (page - 1) * limit;
    
      // Build the query object
      const query = {
        ...(search && { name: { $regex: search, $options: 'i' } }),
        ...(category && { category: { $regex: `^${category}$`, $options: 'i' } }),
        ...(minPrice && maxPrice && { price: { $gte: Number(minPrice), $lte: Number(maxPrice) } }),
      };
    
      const products = await Product.find(query)
        .skip(skip)
        .limit(parseInt(limit));
      const total = await Product.countDocuments(query);
    
      res.json({
        products,
        total,
        page: parseInt(page),
        totalPages: Math.ceil(total / limit),
      });
    } catch (err) {
      console.error("Error fetching products", err);
      res.status(500).json({ error: "Failed to fetch products" });
    }
    
  };
  
const getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  const addProduct = async (req, res) => {
    try {
        const { 
            name, 
            description, 
            price, 
            stock, 
            stockStatus, 
            category, 
            deals, 
            newProduct, 
            topProduct, 
            size 
        } = req.body;

        const images = req.files ? req.files.map((file) => file.path) : [];

        if (!size || !Array.isArray(size) || size.length === 0) {
            return res.status(400).json({ error: 'Size array is required and should include name, price, and weight for each size.' });
        }

        for (const s of size) {
            if (!s.name || !s.price || !s.weight) {
                return res.status(400).json({ error: 'Each size must include a name, price, and weight.' });
            }
        }

        const product = new Product({
            name,
            description,
            price,
            stock,
            stockStatus,
            category,
            images,
            deals,
            newProduct,
            topProduct,
            size,
            author: req.user.id,
        });

        await product.save();
        res.json({ message: 'Product added successfully', product });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const rateProduct = async (req, res) => {
  try {
      const { rating, comment, username } = req.body;
      const product = await Product.findById(req.params.id);
      
      if (!product) {
          return res.status(404).json({ error: 'Product not found' });
      }
      
      // Create a new review object
      const review = {
          user: req.user ? req.user.id : null,
          username: req.user? req.user.name: username || "Anonymous",
          rating: Number(rating),
          text: comment,
      };

      product.comments.push(review);

      // Update average rating
      product.rating = product.comments.reduce((acc, review) => acc + review.rating, 0) / product.comments.length;

      await product.save();

      res.json({ message: 'Review added successfully', product });
  } catch (err) {
      res.status(500).json({ error: err.message });
      console.log('Product not found', err);
  }
};

const loveProduct = async (req, res) => {
  // const user = req.user._id;
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            product.lovedProduct = !product.lovedProduct;
            await product.save();
            res.json({ message: 'Product loved successfully' });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const {
    name,
    description,
    price,
    discount,
    stock,
    stockStatus,
    images,
    size,
    category,
    deals,
    newProduct,
    topProduct,
  } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        discount,
        stock,
        stockStatus,
        images,
        size,
        category,
        deals,
        newProduct,
        topProduct,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json(product)
       console.log('Product deleted successfully');
    }
    catch (err) {
        res.status(500).json({ error: err.message });
        console.log('Product not found', err);
    }
}




module.exports = { getProducts, getProductById, rateProduct, addProduct, updateProduct, deleteProduct, loveProduct };