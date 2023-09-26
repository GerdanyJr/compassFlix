import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';

interface MoviePosterProps {
    id: number,
    url: string
}

export function MoviePoster(props: MoviePosterProps) {
    return (
        <Pressable onPress={() => console.log(props.id)}>
            <Image source={{ uri: props.url }} style={styles.image} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 110,
        height: 150
    }
});