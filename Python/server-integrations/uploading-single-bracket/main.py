import os
import uuid
from dotenv import load_dotenv
from autoenhance import Autoenhance

def get_images():
    """Get all image files from the images directory."""
    folder = "images/"
    image_files = []
    
    for file in os.listdir(folder):
        file_path = os.path.join(folder, file)
        if os.path.isfile(file_path):
            extension = os.path.splitext(file)[1].lower()
            if extension in ['.jpg', '.jpeg', '.png', '.gif']:
                image_files.append(file_path)
    
    return image_files

def main():
    # Load API key from .env file or prompt user
    load_dotenv()
    api_key = os.getenv("API_KEY")
    
    if not api_key:
        api_key = input("Enter your API key: ").strip()
    
    # Initialize the Autoenhance client
    client = Autoenhance(api_key=api_key)
    
    # Get images from the images directory
    image_files = get_images()
    
    if not image_files:
        print("No images found in the images directory.")
        return
    
    # Generate a unique order ID
    order_id = str(uuid.uuid4())
    
    successfully_uploaded = True
    
    # Upload each image
    for image_file in image_files:
        image_name = os.path.basename(image_file)
        
        try:
            # Read the image file
            with open(image_file, 'rb') as f:
                image_data = f.read()
            
            # Create the image in Autoenhance
            result = client.images.create(
                image_name=image_name,
                content_type=client.images.get_content_type(image_file),
                order_id=order_id
            )
            
            # Upload the image to S3
            client.images.upload_to_s3(result.s3_put_object_url, image_data)
            
            print(f"Successfully uploaded {image_name}")
            
        except Exception as e:
            print(f"Failed to upload {image_name}: {str(e)}")
            successfully_uploaded = False
    
    if successfully_uploaded:
        print(f"You can view the uploaded images at: https://app.autoenhance.ai/orders/{order_id}")

if __name__ == "__main__":
    main() 