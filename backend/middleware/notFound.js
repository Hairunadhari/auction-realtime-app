// middleware/notFound.js
const notFound = (req, res, next) => {
    res.status(404).json({
        status: "error",
        message: "Resource not found"
    });
};

module.exports = notFound;
