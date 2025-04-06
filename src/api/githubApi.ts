// src/api/githubApi.ts
import axios from 'axios';
import {User} from "@/src/models/User";

const BASE_URL = 'https://api.github.com';

export const getUserByUsername = async (username: string) : Promise<User | null> => {
    try {
        const response = await axios.get(`${BASE_URL}/users/${username}`);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            return null; // User not found
        }
        throw error;
    }
};


export const getFollowers = async (username: string): Promise<User[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/users/${username}/followers`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch followers:', error);
        return [];
    }
};


export const getFollowing = async (username: string): Promise<User[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/users/${username}/following`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch following:', error);
        return [];
    }
};
