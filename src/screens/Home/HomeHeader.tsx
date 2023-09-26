import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface HomeHeaderProps {
    username: string
}

export function HomeHeader(props: HomeHeaderProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Olá, <Text style={styles.username}>{props.username}</Text>!</Text>
            <Text style={styles.headerSubtitle}>Reveja ou acompanhe os filmes que você assistiu...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 64
    },
    username: {
        color: '#E9A6A6'
    },
    headerTitle: {
        fontSize: 28,
        color: 'white',
        fontWeight: 'bold'
    },
    headerSubtitle: {
        color: 'white'
    }
});