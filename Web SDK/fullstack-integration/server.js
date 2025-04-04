const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up view engine for server-side rendering
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// In-memory storage for properties
const properties = [];

// Routes
app.get('/', async (req, res) => {
  try {
    // Fetch order details for each property
    const propertiesWithImages = await Promise.all(
      properties.map(async (property) => {
        try {
          // Get order details using the JavaScript SDK
          const response = await fetch(`https://api.autoenhance.ai/v3/orders/${property.order_id}/`, {
            method: 'GET',
            headers: {
              'x-api-key': process.env.API_KEY,
              'Content-Type': 'application/json'
            }
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch order details: ${response.statusText}`);
          }

          const order = await response.json();

          console.log(order);
          
          // Get the first image from the order if available
          let imageUrl = null;
          if (order.images && order.images.length > 0) {
            const imageId = order.images[0].id;
            const imageUrlResponse = await autoenhance.ImagesApi.downloadEnhancedImageRaw({
              id: imageId,
              size: "large",
            });
            imageUrl = imageUrlResponse.raw.url;
          }
          
          return {
            ...property,
            orderStatus: order.status,
            imageUrl
          };
        } catch (error) {
          console.error(`Error fetching order details for ${property.orderId}:`, error);
          return {
            ...property,
            orderStatus: 'error',
            imageUrl: null
          };
        }
      })
    );
    
    res.render('list', { properties: propertiesWithImages });
  } catch (error) {
    console.error('Error rendering list:', error);
    res.status(500).send('Error rendering list');
  }
});

app.get('/create', (req, res) => {
  // Render the create view with the API key
  res.render('create', { apiKey: process.env.API_KEY });
});

// Create page - POST to handle form submission
app.post('/create', async (req, res) => {
  try {
    const { order_id, propertyName, propertyAddress } = req.body;
    
    // Store property in memory
    const property = {
      id: Date.now().toString(),
      name: propertyName,
      address: propertyAddress,
      orderId: order_id,
      createdAt: new Date().toISOString()
    };
    
    properties.push(property);
    
    // Redirect to list view
    res.redirect('/');
  } catch (error) {
    console.error('Error processing submission:', error);
    res.status(500).send('Error processing submission');
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 