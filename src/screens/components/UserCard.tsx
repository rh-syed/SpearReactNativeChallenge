// src/views/components/UserCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { User } from '@/src/models/User';

interface UserCardProps {
    user: User;
}

export default function UserCard({ user }: UserCardProps) {
    return (
        <View style={styles.card}>
            <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
            <Text style={styles.username}>{user.login}</Text>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.bio}>{user.bio}</Text>
            <Text style={styles.stats}>
                {user.followers} followers • {user.following} following
            </Text>
        </View>
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
    stats: {
        fontSize: 14,
        color: '#333',
        marginTop: 8,
    },
});
