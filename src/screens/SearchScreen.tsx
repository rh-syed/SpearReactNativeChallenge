import React from 'react';
import { View, Text, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {useSearchViewModel} from "@/src/viewModel/useSearchViewModel";
import UserCard from "@/src/screens/components/UserCard";

export default function SearchScreen() {
    const {
        username,
        setUsername,
        user,
        loading,
        notFound,
        error,
        searchUser,
    } = useSearchViewModel();

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <Text style={styles.title}>GitHub User Search</Text>

            <View style={{ width: '100%', maxWidth: 500 }}>
                <TextInput
                    placeholder="Enter GitHub username"
                    value={username}
                    onChangeText={setUsername}
                    onSubmitEditing={searchUser}
                    returnKeyType="search"
                    style={styles.input}
                    autoCapitalize="none"
                />
            </View>


            {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}

            {notFound && <Text style={styles.error}>User not found</Text>}
            {error && <Text style={styles.error}>{error}</Text>}

            {user && <UserCard user={user} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginBottom: 12,
    },
    error: {
        color: 'red',
        marginTop: 16,
    },
});
