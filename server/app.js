const express = require('express');
const cors = require('cors');
const errorHandler = require('./errors/errorHandler');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', require('./api/users'));
// app.use('/api/products', require('./api/products'));
// app.use('/api/cart-products', require('./api/cartProducts'));
// app.use('/api/categories', require('./api/categories'));
// app.use('/api/carts', require('./api/carts'));
// app.use('/api/orders', require('./api/orders'));

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
