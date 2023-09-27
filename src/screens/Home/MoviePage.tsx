import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function MoviePage() {
    return (
        <View style={styles.container}>
            <Text>Tela dos filmes</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});