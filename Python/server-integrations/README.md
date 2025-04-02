# Autoenhance.ai Python Server Integration Examples

This directory contains example implementations for integrating with Autoenhance.ai using Python. The examples demonstrate how to upload different types of images (single bracket, HDR, and 360) to the Autoenhance.ai platform using the official Python SDK.

## Prerequisites

- Python 3.7 or higher
- An Autoenhance.ai API key
- Required Python packages (install using `pip install -r requirements.txt`)

## Setup

1. Create a `.env` file in each example directory with your API key:
   ```
   API_KEY=your_api_key_here
   ```
   You can copy the `.env.example` file to `.env` and update it with your API key.

2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Place your images in the `images` directory of the example you want to run.

## Examples

### Single Bracket Upload
Located in `uploading-single-bracket/`
- Uploads individual images to Autoenhance.ai
- Each image is processed independently

### HDR Upload
Located in `uploading-hdr/`
- Uploads multiple bracketed images
- Automatically merges the images into an HDR image
- Images should be taken with different exposure settings

### 360 Upload
Located in `uploading-360/`
- Uploads 360-degree images
- Supports various image formats including equirectangular projections

## Running the Examples

To run any of the examples:

```bash
python main.py
```

The script will:
1. Load your API key from the `.env` file
2. Find images in the `images` directory
3. Upload them to Autoenhance.ai using the official Python SDK
4. Provide a URL where you can view the processed images

## Error Handling

The examples include error handling for:
- Missing API key
- Missing images
- Upload failures
- API errors

Check the console output for any error messages or success confirmations.

## Using the Autoenhance.ai Python SDK

These examples use the official Autoenhance.ai Python SDK, which provides a simple and intuitive interface for interacting with the Autoenhance.ai API. The SDK handles authentication, request formatting, and response parsing, making it easy to integrate Autoenhance.ai into your Python applications.

For more information about the SDK, visit the [official documentation](https://docs.autoenhance.ai/sdks/python).
