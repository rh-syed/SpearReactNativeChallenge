// src/repositories/UserRepository.ts
import { getUserByUsername } from '../api/githubApi';
import { User } from '../models/User';

export const UserRepository = {
    getUser: async (username: string): Promise<User | null> => {
        return await getUserByUsername(username);
    },
};
