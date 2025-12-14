import { UserProfile } from '../types';
import { mockApiResponse } from './api';

// Initial Mock Data (Moved from Context)
const DEFAULT_USER: UserProfile = {
    id: 'TAI768273',
    username: 'Gebeyehu',
    name: 'Gebeyehu Lanteyderu',
    email: 'gebeyehuasefa42@gmail.com',
    phone: '0911771387',
    country: 'Ethiopia',
    sponsorId: 'TAI221381',
    sponsorName: 'Jango',
    walletAddress: 'TGAC9ea1EGT3eDJxjayH6nwYDMyaTBCR62',
    image: 'https://img.freepik.com/free-vector/cute-robot-wearing-hat-flying-cartoon-vector-icon-illustration-science-technology-icon-isolated_138676-5186.jpg'
};

export const userService = {
    getProfile: async (userId: string = 'TAI768273') => {
        return mockApiResponse<UserProfile>(`user?id=${userId}`);
    },

    updateProfile: async (updates: Partial<UserProfile>) => {
        // Send updates to the backend
        // We include the ID in the body to ensure the backend validates it
        const payload = { id: 'TAI768273', ...updates };

        return mockApiResponse<UserProfile>('users/profile', 'POST', payload);
    },

    uploadProfileImage: async (userId: string, file: File) => {
        const formData = new FormData();
        formData.append('id', userId);
        formData.append('image', file);

        const response = await fetch('http://localhost/MLM-main/api/user.php', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message || 'Upload failed');
        }
        return data;
    }
};
