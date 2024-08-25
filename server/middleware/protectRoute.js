const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

exports.protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies['jwt-store'];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized - No Token Found' });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            return res.status(401).json({ success: false, message: 'Unauthorized - Invalid Token' });
        }

        const user = await User.findById(decode.userId).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log('Error in protecting route', error.message);
        res.status(500).json({ success: false, message: 'Internal Error' });
    }
}