import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

export const useWishlist = create((set) => ({
    wishlist: false,
    toggleWishlist: () => set((state) => ({ wishlist: !state.wishlist })),

    addWishList: async (userId, productId) => {
        try {
            console.log('Sending to wishlist:', { userId, productId });

            const response = await axios.post('/api/wishlist/add', { userId, productId });
            console.log('Add Wishlist Response:', response.data);

            if (response.data.success) {
                set({ wishlist: true });
                toast.success('Product added to wishlist');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            toast.error('Failed to add product to wishlist');
        }
    },

    removeWishList: async (userId, productId) => {
        try {
            console.log('Removing from wishlist:', { userId, productId });

            const response = await axios.post('/api/wishlist/remove', { userId, productId });
            console.log('Remove Wishlist Response:', response.data);

            if (response.data.success) {
                set({ wishlist: false });
                toast.success('Product removed from wishlist');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error removing from wishlist:", error);
            toast.error('Failed to remove product from wishlist');
        }
    },
}));