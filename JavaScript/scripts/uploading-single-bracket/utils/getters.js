const fs = require("fs");
const path = require("path");

const getApiKey = () => {
    const envFilePath = path.resolve(__dirname, "../.env");

    if (fs.existsSync(envFilePath)) {
        require("dotenv").config();
    } else {
        console.error(
            "No .env file found. Please create a .env file and set the API_KEY environment variable."
        );
        return;
    }

    const apiKey = process.env.API_KEY;

    if (!apiKey) {
        console.error(
            "No API key found. Please set the API_KEY environment variable in the .env file."
        );
        return;
    }

    return apiKey;
};

const getImages = () => {
    return new Promise((resolve, reject) => {
        const imagesPath = path.resolve(__dirname, "../images");

        fs.readdir(imagesPath, async (err, files) => {
            if (err) {
                console.error("Error loading images:", err);
                reject(err);
                return;
            }

            const promises = files.map(async (file) => {
                const filePath = path.join(imagesPath, file);

                try {
                    const ext = path.extname(file).toLowerCase();
                    let fileType;
                    switch (ext) {
                        case ".jpg":
                        case ".jpeg":
                            fileType = "image/jpeg";
                            break;
                        case ".png":
                            fileType = "image/png";
                            break;
                        default:
                            fileType = "application/octet-stream";
                    }

                    const fileBuffer = fs.readFileSync(filePath);

                    return {
                        name: file,
                        type: fileType,
                        buffer: fileBuffer,
                    };
                } catch (error) {
                    console.error("Error getting file stats:", error);
                    return null;
                }
            });

            const imageData = await Promise.all(promises.filter(Boolean));
            resolve(imageData);
        });
    });
};

module.exports = {
    getApiKey,
    getImages,
};
