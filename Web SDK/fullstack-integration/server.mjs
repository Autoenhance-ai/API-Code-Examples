import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import Autoenhance from '@autoenhance.ai/javascript';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Initialize Autoenhance client
const autoenhance = new Autoenhance.default(process.env.API_KEY);

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
          const order = await autoenhance.OrdersApi.retreiveOrder({ id: property.orderId });
          
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
    const { orderId, propertyName, propertyAddress } = req.body;
    
    // Store property in memory
    const property = {
      id: Date.now().toString(),
      name: propertyName,
      address: propertyAddress,
      orderId: orderId,
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