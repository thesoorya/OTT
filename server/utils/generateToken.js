const jwt = require('jsonwebtoken');

exports.generateTokenAndCookie = async (userId, res) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('jwt-store', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development'
        });

        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error("Token generation failed");
    }
};
