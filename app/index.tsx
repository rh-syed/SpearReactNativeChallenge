// app/index.tsx
import { useEffect } from 'react';
import { useRouter, useNavigationContainerRef } from 'expo-router';
import { View } from 'react-native';

export default function Index() {
    const router = useRouter();

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.replace('/search');
        }, 0); // defer until after layout is mounted

        return () => clearTimeout(timeout);
    }, []);

    return <View />; // optional: splash/loading
}
