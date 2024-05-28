const { v4: uuidv4 } = require("uuid");

const generateOrderId = () => {
    return uuidv4();
};

module.exports = {
    generateOrderId,
};
