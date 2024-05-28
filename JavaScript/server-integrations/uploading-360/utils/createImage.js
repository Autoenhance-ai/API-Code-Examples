const createImage = async (apiKey, orderId, image) => {
    try {
        const data = await fetch("https://api.autoenhance.ai/v3/images/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey,
            },
            body: JSON.stringify({
                image_name: image.name,
                contentType: image.type,
                order_id: orderId,
                threesixty: true,
            }),
        });
        return await data.json();
    } catch (e) {
        console.error("Error uploading image:", e);
    }
};

module.exports = {
    createImage,
};
