const { getApiKey, getImages } = require("./utils/getters");
const { generateOrderId } = require("./utils/generateOrderId");
const { createImage } = require("./utils/createImage");

const uploadImages = async () => {
    const apiKey = getApiKey();
    // Retrieving images with node.js as a server-side API
    // If you want to retrieve images on a browser, you can use the FileReader API, which is a client-side API
    const images = await getImages();
    const orderId = generateOrderId();

    for (const image of images) {
        const name = image.name;
        const type = image.type;

        const { s3PutObjectUrl } = await createImage(apiKey, orderId, image);

        try {
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
