/**
 * Base API Service
 * 
 * Connects to the local PHP Backend (Evolentra).
 * Replaces the mock simulation with real HTTP requests.
 */

import { ApiResponse } from '../types';

const API_BASE_URL = 'http://localhost/MLM-main/api';

export const mockApiResponse = async <T>(endpoint: string, method: string = 'GET', body?: any): Promise<ApiResponse<T>> => {
    try {
        // Construct URL.
        // The 'endpoint' argument usually comes as 'users/profile' or similar from services.
        // Our PHP API structure is flat: 'user.php', 'login.php'.
        // We need to map the service calls to PHP files.

        // Simple mapping logic:
        // endpoint: "login" -> "login.php"
        // endpoint: "users/profile?id=..." -> "user.php?id=..."
        // endpoint: "wallets?id=..." -> "wallets.php?id=..."

        let dbEndpoint = endpoint;

        // Basic routing adjustments for our simple PHP backend
        if (endpoint === 'login') dbEndpoint = 'login';
        else if (endpoint.startsWith('users/profile')) dbEndpoint = 'user';
        else if (endpoint.startsWith('wallets')) dbEndpoint = 'wallets';
        else if (endpoint.startsWith('transactions')) dbEndpoint = 'transactions';
        else if (endpoint.startsWith('team')) dbEndpoint = 'team';
        else if (endpoint.startsWith('genealogy')) dbEndpoint = 'team'; // Team endpoint handles genealogy action
        else if (endpoint.startsWith('reports')) dbEndpoint = 'reports';

        // Handle query params if present in the endpoint string
        const parts = endpoint.split('?');
        let queryParams = '';
        if (parts.length > 1) {
            queryParams = '?' + parts[1];

            // Allow re-mapping of the base part
            const base = parts[0];
            dbEndpoint = base; // Default to base part

            // Specific Mappings
            if (base === 'users/profile') dbEndpoint = 'user';
            else if (base === 'wallets') dbEndpoint = 'wallets';
            else if (base === 'transactions') dbEndpoint = 'transactions';
            else if (base === 'team') dbEndpoint = 'team';
            else if (base === 'genealogy') dbEndpoint = 'team';
            else if (base === 'reports') dbEndpoint = 'reports';
        }

        const url = `${API_BASE_URL}/${dbEndpoint}.php${queryParams}`;

        // Debug log
        console.log(`Fetching: ${url}`);

        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);
        const data = await response.json();

        if (data.success === false) {
            throw new Error(data.message || 'API Error');
        }

        // Unify response structure
        // Our frontend expects { data: T, status: number, message: string }

        // Backend returns { success: true, user: ... } for login
        if (data.user) {
            return {
                data: data.user as T,
                status: 200,
                message: 'Success'
            };
        }

        // Backend returns { success: true, data: ... } for others
        return {
            data: data.data as T,
            status: 200,
            message: data.message || 'Success'
        };

    } catch (error: any) {
        console.error(`API Call Failed (${endpoint}):`, error);
        // Return a structured error that services can handle, or throw
        throw error;
    }
};

export const mockApiError = async (message: string): Promise<never> => {
    throw new Error(message);
};
