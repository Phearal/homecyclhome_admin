// services/apiService.ts
import { getCookie } from 'cookies-next';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions {
  method: HttpMethod;
  body?: any;
}

export const apiService = async (endpoint: string, method: HttpMethod, body?: any) => {
  try {
    const token = getCookie('token') as string | undefined;

    if (!token) {
      throw new Error("Token is missing from cookies");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}${endpoint}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: method !== 'GET' && body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} - ${await response.text()}`);
    }

    // Parse the response as JSON
    return await response.json();

  } catch (error) {
    console.error("API Service Error:", error);
    throw error;
  }
};
