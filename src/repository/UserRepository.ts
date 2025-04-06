// src/repositories/UserRepository.ts
import {getFollowers, getFollowing, getUserByUsername} from '../api/githubApi';
import { User } from '../models/User';

export const UserRepository = {
    getUser: async (username: string): Promise<User | null> => {
        return await getUserByUsername(username);
    },

    getFollowers: async (username: string): Promise<User[]> => {
        return await getFollowers(username);
    },

    getFollowing: async (username: string): Promise<User[]> => {
        return await getFollowing(username);
    },
};


