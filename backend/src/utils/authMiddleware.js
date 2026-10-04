import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
        return res.status(401).json({
            success: false,
            message: "Authentication required",
        });
    }

    const [type, token] = tokenHeader.split(" ");

    if (type !== "Bearer" || !token) {
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

export default authenticate;
