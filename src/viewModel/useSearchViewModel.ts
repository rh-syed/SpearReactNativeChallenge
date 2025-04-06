// src/viewmodels/useSearchViewModel.ts
import { useState } from 'react';
import { User } from '../models/User';
import {UserRepository} from "@/src/repository/UserRepository";

export function useSearchViewModel() {
    const [username, setUsername] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchUser = async () => {
        if (!username.trim()) return;

        setLoading(true);
        setError(null);
        setNotFound(false);

        try {
            const result = await UserRepository.getUser(username.trim());
            if (result) {
                setUser(result);
            } else {
                setUser(null);
                setNotFound(true);
            }
        } catch (err) {
            setError('Something went wrong.');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    return {
        username,
        setUsername,
        user,
        loading,
        notFound,
        error,
        searchUser,
    };
}
