import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { Movie } from '../../types/Movie';

export function MovieDetails({ movie }: { movie: Movie }) {
    return (
        <View style={styles.container}>
            <Text style={styles.overview}>
                {movie!.overview}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 12,
    },
    overview: {
        color: 'white',
    }
});