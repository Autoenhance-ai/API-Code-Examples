const { Autoenhance } = require("@autoenhance.ai/javascript");

const createImage = async (apiKey, orderId, image) => {
    try {
        const client = new Autoenhance(apiKey);
        const response = await client.images.create({
            image_name: image.name,
            contentType: image.type,
            order_id: orderId,
        });
        return response;
    } catch (e) {
        console.error("Error uploading image:", e);
    }
};

module.exports = {
    createImage,
};
