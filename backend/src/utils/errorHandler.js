const errorHandler = (err, req, res, next) => {
    if (err.statusCode) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }

    console.error(err);

    res.status(500).json({
        success: false,
        message: "Internal server error",
    });
};

export default errorHandler;
