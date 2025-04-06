import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { User } from '@/src/models/User';

interface UserCardProps {
    user: User;
}

export default function UserCard({ user }: UserCardProps) {
    const router = useRouter();

    const goToProfile = () => {
        router.push({
            pathname: '/profile/[username]',
            params: {
                username: user.login,
                user: JSON.stringify(user),
            },
        });
    };

    return (
        <Pressable onPress={goToProfile} style={styles.card}>
            <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
            <Text style={styles.username}>{user.login}</Text>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.bio}>{user.bio}</Text>

            <View style={styles.statsRow}>
                <Text style={styles.stats}>{user.followers} followers</Text>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.stats}>{user.following} following</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        maxWidth: 320,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 10,
        elevation: 4,
        alignItems: 'center',
        marginBottom: 16,
    },
    avatar: {
        width: 96,
        height: 96,
        borderRadius: 48,
        marginBottom: 12,
    },
    username: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    name: {
        fontSize: 16,
        color: '#444',
    },
    bio: {
        fontStyle: 'italic',
        color: '#666',
        textAlign: 'center',
        marginVertical: 8,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 8,
        alignItems: 'center',
    },
    stats: {
        fontSize: 14,
        color: '#333',
    },
    dot: {
        color: '#999',
        marginHorizontal: 6,
    },
});
