const User = require("../models/userModel");

// Add to Cart
exports.addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        const existingProduct = user.cart.find(item => item.productId.toString() === productId);

        if (existingProduct) {
            // Increment the existing quantity by the new quantity
            await User.findOneAndUpdate(
                { _id: userId, "cart.productId": productId },
                { $inc: { "cart.$.quantity": quantity } },
                { new: true }
            );
        } else {
            // Add new product with the specified quantity
            await User.findByIdAndUpdate(
                userId,
                { $push: { cart: { productId, quantity } } },
                { new: true }
            );
        }

        // Fetch the updated user data to send the response
        const updatedUser = await User.findById(userId);
        res.status(200).json({ success: true, cart: updatedUser.cart });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


// Remove from Cart
exports.removeFromCart = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        const existingProduct = user.cart.find(item => item.productId.toString() === productId);

        if (!existingProduct) return res.status(404).json({ success: false, message: "Product not found in cart" });

        if (existingProduct.quantity > 1) {
            await User.findOneAndUpdate(
                { _id: userId, "cart.productId": productId },
                { $inc: { "cart.$.quantity": -1 } },
                { new: true }
            );
        } else {
            await User.findByIdAndUpdate(
                userId,
                { $pull: { cart: { productId } } },
                { new: true }
            );
        }

        const updatedUser = await User.findById(userId);
        res.status(200).json({ success: true, cart: updatedUser.cart });
    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Delete Cart
exports.deleteCart = async (req, res) => {
    const { userId } = req.body;

    try {
        await User.findByIdAndUpdate(
            userId,
            { $set: { cart: [] } },
            { new: true }
        );

        res.status(200).json({ success: true, message: "Cart has been cleared" });
    } catch (error) {
        console.error("Error deleting cart:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get Cart Items
exports.getCartItems = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        res.status(200).json({ success: true, cart: user.cart });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
