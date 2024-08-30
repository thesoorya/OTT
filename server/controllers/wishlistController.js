const User = require("../models/userModel");

// Add to Wishlist
exports.addToWishlist = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        // Find the user and update the wishlist atomically
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if the product already exists in the wishlist
        const existingProduct = user.wishList.find((item) => item.toString() === productId);

        if (existingProduct) {
            return res.status(400).json({ success: false, message: "Product already in wishlist" });
        } else {
            // Add the new product to the wishlist
            await User.findByIdAndUpdate(
                userId,
                { $push: { wishList: productId } },
                { new: true }
            );
        }

        // Find the updated user wishlist
        const updatedUser = await User.findById(userId);

        res.status(200).json({ success: true, wishList: updatedUser.wishList });
    } catch (error) {
        console.error("Error adding to wishlist:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Remove from Wishlist
exports.removeFromWishlist = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        // Find the user and check if the product exists in the wishlist
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if the product exists in the wishlist
        const existingProduct = user.wishList.find((item) => item.toString() === productId);

        if (!existingProduct) {
            return res.status(404).json({ success: false, message: "Product not found in wishlist" });
        } else {
            // Remove the product from the wishlist
            await User.findByIdAndUpdate(
                userId,
                { $pull: { wishList: productId } },
                { new: true }
            );
        }

        // Find the updated wishlist
        const updatedUser = await User.findById(userId);

        res.status(200).json({ success: true, wishList: updatedUser.wishList });
    } catch (error) {
        console.error("Error removing from wishlist:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
