const { getApiKey, getImages } = require("./utils/getters");
const { generateOrderId } = require("./utils/generateOrderId");
const { createImage } = require("./utils/createImage");
const { Autoenhance } = require("@autoenhance.ai/javascript");

const uploadImages = async () => {
    const apiKey = getApiKey();
    const client = new Autoenhance(apiKey);
    const images = await getImages();
    const orderId = generateOrderId();

    if (images.length === 0) {
        console.error("No images found in the images folder");
        return;
    }

    for (const image of images) {
        const name = image.name;
        const type = image.type;

        try {
            const { s3PutObjectUrl } = await createImage(apiKey, orderId, image);
            
            const uploadResponse = await fetch(s3PutObjectUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": type,
                },
                body: image.buffer,
            });

            if (uploadResponse.ok) {
                console.log(`Uploaded image ${name}`);
            } else {
                console.error(`Failed to upload ${name}`);
            }
        } catch (e) {
            console.error(`Failed to upload ${name}, error: ${e}`);
        }
    }
    console.log(
        `You can view the uploaded images at: https://app.autoenhance.ai/orders/${orderId}`
    );
};

uploadImages();
