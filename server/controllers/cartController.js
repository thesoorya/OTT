const User = require("../models/userModel");

// Add to Cart
exports.addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        // Find the user and update the cart atomically
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if the product already exists in the cart
        const existingProduct = user.cart.find((item) => item.productId.toString() === productId);

        if (existingProduct) {
            // Update the quantity of the existing product
            await User.findOneAndUpdate(
                { _id: userId, "cart.productId": productId },
                { $inc: { "cart.$.quantity": quantity } },
                { new: true }
            );
        } else {
            // Add the new product to the cart
            await User.findByIdAndUpdate(
                userId,
                { $push: { cart: { productId, quantity } } },
                { new: true }
            );
        }

        // Find the updated user cart
        const updatedUser = await User.findById(userId);

        res.status(200).json({ success: true, cart: updatedUser.cart });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// remove from cart
exports.removeFromCart = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        // Find the user and check if the product exists in the cart
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if the product exists in the cart
        const existingProduct = user.cart.find((item) => item.productId.toString() === productId);

        if (!existingProduct) {
            return res.status(404).json({ success: false, message: "Product not found in cart" });
        }

        if (existingProduct.quantity > 1) {
            // Decrement the quantity of the existing product
            await User.findOneAndUpdate(
                { _id: userId, "cart.productId": productId },
                { $inc: { "cart.$.quantity": -1 } },
                { new: true }
            );
        } else {
            // Remove the product from the cart if quantity is 1
            await User.findByIdAndUpdate(
                userId,
                { $pull: { cart: { productId } } },
                { new: true }
            );
        }

        // Find the updated cart
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
        // Clear the entire cart by setting the cart array to an empty array
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