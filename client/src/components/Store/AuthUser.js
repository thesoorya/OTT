import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    user: null,
    wishlist: [],
    isSigning: false,
    isCheckAuth: false,
    isLogging: false,
    isLoggingout: false,
    cart: [],

    // Register user
    register: async (credentials, navigate) => {
        set({ isSigning: true });
        try {
            const response = await axios.post('/api/auth/register', credentials);
            set({ user: response.data.user, isSigning: false });
            if (response.data.success) {
                navigate('/');
            }
            toast.success('Account created successfully');
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Registration failed');
            set({ user: null, isSigning: false });
        }
    },

    // Login user
    login: async (credentials, navigate) => {
        set({ isLogging: true });
        try {
            const response = await axios.post('/api/auth/login', credentials);
            set({ user: response.data.user, isLogging: false });
            if (response.data.success) {
                navigate('/');
            }
            toast.success('Login successful');
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Login failed');
            set({ isLogging: false });
        }
    },

    // Logout user
    logout: async () => {
        set({ isLoggingout: true });
        try {
            await axios.post('/api/auth/logout');
            set({ user: null, wishlist: [], cart: [], isLoggingout: false });
            toast.success('Logout successful');
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Logout failed');
            set({ isLoggingout: false });
        }
    },

    // Check authentication status
    authCheck: async () => {
        set({ isCheckAuth: true });
        try {
            const response = await axios.get('/api/auth/authcheck');
            set({ user: response.data.user, isCheckAuth: false });
        } catch (error) {
            set({ user: null, isCheckAuth: false });
        }
    },

    // Get wishlist
    getWishlist: async () => {
        try {
            const response = await axios.get('/api/wishlist/getwishlist');
            if (response.data.success) {
                set({ wishlist: response.data.list });
            } else {
                toast.error('Failed to load wishlist');
            }
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
    },

    // Add to wishlist
    addWishList: async (userId, productId) => {
        try {
            const response = await axios.post('/api/wishlist/add', { userId, productId });
            if (response.data.success) {
                set((state) => ({ wishlist: [...state.wishlist, productId] }));
                toast.success('Product added to wishlist');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            toast.error('Failed to add product to wishlist');
        }
    },

    // Remove from wishlist
    removeWishList: async (userId, productId) => {
        try {
            const response = await axios.post('/api/wishlist/remove', { userId, productId });
            if (response.data.success) {
                set((state) => ({ wishlist: state.wishlist.filter(id => id !== productId) }));
                toast.success('Product removed from wishlist');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error removing from wishlist:", error);
            toast.error('Failed to remove product from wishlist');
        }
    },

    // Get cart items
    getCart: async () => {
        try {
            const response = await axios.get('/api/cart/getcart');
            if (response.data.success) {
                set({ cart: response.data.cart });
            } else {
                toast.error('Failed to load cart');
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    },

    // Add to cart
    addToCart: async (userId, productId, quantity) => {
        try {
            const response = await axios.post('/api/cart/add', { userId, productId, quantity });
            if (response.data.success) {
                set((state) => ({ cart: response.data.cart }));
                toast.success('Product added to cart');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error('Failed to add product to cart');
        }
    },

    // Remove from cart
    removeFromCart: async (userId, productId) => {
        try {
            const response = await axios.post('/api/cart/remove', { userId, productId });
            if (response.data.success) {
                set((state) => ({ cart: response.data.cart }));
                toast.success('Product removed from cart');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error removing from cart:", error);
            toast.error('Failed to remove product from cart');
        }
    },
}));
