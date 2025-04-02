# Autoenhance Web SDK Express Example

This is a sample project that demonstrates how to integrate the Autoenhance Web SDK and JavaScript SDK with an Express.js application.

## Features

- Create view with Web SDK for image uploads
- Server-side rendered list view of properties
- In-memory storage of property data
- Integration with Autoenhance API for image processing

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Autoenhance API key

## Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with your Autoenhance API key:
   ```
   API_KEY=your_api_key_here
   ```

## Usage

1. Start the server:
   ```
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000`
3. Click "Add New Property" to create a new property with images
4. Fill in the property details and upload images using the Autoenhance Web SDK
5. Submit the form to save the property
6. View the list of properties on the home page

## Project Structure

- `server.js` - Express.js server with routes and in-memory storage
- `views/list.ejs` - Server-side rendered template for the property list
- `views/create.ejs` - Server-side rendered template for the create view
- `package.json` - Project dependencies and scripts

## How It Works

1. The create page uses the Autoenhance Web SDK to handle image uploads
2. When images are uploaded, an order ID is generated and stored in a hidden form field
3. The form is submitted to the server, which stores the property data in memory
4. The list page is server-side rendered, displaying all properties from memory
5. The server uses the JavaScript SDK to fetch order details and enhanced images from the Autoenhance API
6. The API key is passed from the server to the client-side template using EJS

## License

MIT 