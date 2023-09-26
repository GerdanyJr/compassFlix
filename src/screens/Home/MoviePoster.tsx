import React, { memo } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

interface MoviePosterProps {
    id: string,
    url: string
}

export const MoviePoster = memo((props: MoviePosterProps) => {
    return (
        <View>
            <Pressable style={styles.container} onPress={() => console.log(props.id)} android_ripple={{ foreground: true, color: 'grey' }}>
                <Image source={{ uri: props.url }} style={styles.image} />
            </Pressable>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        borderRadius: 8
    },
    image: {
        width: 105,
        height: 150
    }
});