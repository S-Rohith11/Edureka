const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const verifyToken = promisify(jwt.verify);

exports.authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; // Extract token from authorization header

        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        // Verify token
        const decoded = await verifyToken(token, process.env.JWT_SECRET);

        // Attach user data to request object
        req.user = decoded;

        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
};
