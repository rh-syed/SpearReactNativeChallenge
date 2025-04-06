import { useEffect, useState } from 'react';
import { User } from '../models/User';
import {UserRepository} from "@/src/repository/UserRepository";

export function useProfileViewModel(initialUser: User) {
    const [user, setUser] = useState<User>(initialUser);
    const [followers, setFollowers] = useState<User[]>([]);
    const [following, setFollowing] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProfileData = async () => {
        setLoading(true);
        setError(null);

        try {
            const [fullUser, fetchedFollowers, fetchedFollowing] = await Promise.all([
                UserRepository.getUser(initialUser.login),
                UserRepository.getFollowers(initialUser.login),
                UserRepository.getFollowing(initialUser.login),
            ]);

            setUser(fullUser!);
            setFollowers(fetchedFollowers);
            setFollowing(fetchedFollowing);
        } catch (err) {
            console.error(err);
            setError('Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, [initialUser.login]);

    return {
        user,
        followers,
        following,
        loading,
        error,
        refresh: fetchProfileData,
    };
}
