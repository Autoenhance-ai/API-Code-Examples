const fs = require("fs");
const path = require("path");

const getApiKey = () => {
    const envFilePath = path.resolve(__dirname, "../.env");

    if (fs.existsSync(envFilePath)) {
        require("dotenv").config();
    } else {
        console.error(
            "No .env file found. Please create a .env file in the root folder (which contains package.json file) and set the API_KEY environment variable."
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
                        case ".dng":
                            fileType = "image/x-adobe-dng";
                            break;
                        case ".cr2":
                            fileType = "image/x-canon-cr2";
                            break;
                        case ".cr3":
                            fileType = "image/x-canon-cr3";
                            break;
                        case ".nrw":
                            fileType = "image/x-nikon-nrw";
                            break;
                        case ".nef":
                            fileType = "image/x-nikon-nef";
                            break;
                        case ".arw":
                            fileType = "image/x-sony-arw";
                            break;
                        case ".srf":
                            fileType = "image/x-sony-srf";
                            break;
                        case ".sr2":
                            fileType = "image/x-sony-sr2";
                            break;
                        case ".raf":
                            fileType = "image/x-fuji-raf";
                            break;
                        case ".tif":
                        case ".tiff":
                            fileType = "image/tiff";
                            break;
                        case ".heic":
                            fileType = "image/heic";
                            break;
                        case ".avif":
                            fileType = "image/avif";
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
