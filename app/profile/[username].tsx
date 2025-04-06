import React, { useMemo, useState } from 'react';
import {
    View,
    FlatList,
    Pressable,
    Image,
    Text,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SegmentedButtons } from 'react-native-paper';

import { User } from '@/src/models/User';
import {useProfileViewModel} from "@/src/viewModel/useProfileViewModel";
import UserCard from "@/src/screens/components/UserCard";

export default function ProfileScreen() {
    const { user: userString } = useLocalSearchParams();
    const router = useRouter();

    // Parse passed user object
    const initialUser: User = useMemo(() => JSON.parse(userString as string), [userString]);

    // ViewModel handles full fetch
    const {
        user, // ✅ updated with full profile
        followers,
        following,
        loading,
        error,
    } = useProfileViewModel(initialUser);

    const [selectedTab, setSelectedTab] = useState<'followers' | 'following'>('followers');

    const renderUserList = (users: User[]) => (
        <FlatList
            data={users}
            keyExtractor={(item) => item.login}
            contentContainerStyle={{ paddingBottom: 32 }}
            renderItem={({ item }) => (
                <Pressable
                    style={styles.item}
                    onPress={() =>
                        router.push({
                            pathname: '/profile/[username]',
                            params: {
                                username: item.login,
                                user: JSON.stringify(item),
                            },
                        })
                    }
                >
                    <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
                    <Text style={styles.username}>{item.login}</Text>
                </Pressable>
            )}
        />
    );

    if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;
    if (error) return <Text style={{ padding: 16, color: 'red' }}>{error}</Text>;

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.cardContainer}>
                <UserCard user={user} />
                <SegmentedButtons
                    value={selectedTab}
                    onValueChange={(value) => setSelectedTab(value as 'followers' | 'following')}
                    buttons={[
                        {
                            value: 'followers',
                            label: `Followers (${user.followers ?? 0})`,
                        },
                        {
                            value: 'following',
                            label: `Following (${user.following ?? 0})`,
                        },
                    ]}
                    style={{ marginTop: 16 }}
                />
            </View>

            <View style={styles.listContainer}>
                {selectedTab === 'followers'
                    ? renderUserList(followers)
                    : renderUserList(following)}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        padding: 16,
        backgroundColor: '#f5f5f5',
        alignItems: 'center', // ✅ center the UserCard
    },
    listContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 12,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    username: {
        fontSize: 16,
        color: '#333',
    },
});
