const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');


dotenv.config();
connectDB();

const app = express();
app.use(express.json());


app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
));

app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', require('./routes/auth.route.js'));
app.use('/api/products', require('./routes/product.route.js'));
app.use('/api/orders', require('./routes/order.route.js'));
app.use('/api/blogs', require('./routes/blog.route.js'));
app.use('/api/payments', require('./routes/payment.route.js'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
