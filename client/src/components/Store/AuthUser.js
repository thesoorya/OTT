import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

export const useAuthStore = create((set) => ({
    user: null,
    isSigning: false,
    isCheckAuth: false,
    isLogging: false,
    isLoggingout: false,

    // Register user
    register: async (credentials, navigate) => {
        set({ isSigning: true });
        try {
            const response = await axios.post('/api/auth/register', credentials);
            set({ user: response.data.user, isSigning: false });
            if (response.data.success) {
                navigate('/')
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
                navigate('/')
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
            set({ user: null, isLoggingout: false });
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
}));