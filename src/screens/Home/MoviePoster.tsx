import React, { memo } from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';

interface MoviePosterProps {
    id: string,
    url: string
}

export const MoviePoster = memo((props: MoviePosterProps) => {
    return (
        <Pressable onPress={() => console.log(props.id)}>
            <Image source={{ uri: props.url }} style={styles.image} />
        </Pressable>
    );
});

const styles = StyleSheet.create({
    image: {
        width: 105,
        height: 150,
        borderRadius: 8
    }
});