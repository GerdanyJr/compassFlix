import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { memo } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

interface MoviePosterProps {
    id: string,
    url: string,
    pressableStyles?: any,
    imageStyles?: any,
}

export const MoviePoster = memo((props: MoviePosterProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    return (
        <View>
            <Pressable style={[props.pressableStyles, styles.container]}
                onPress={() => navigation.push('MoviePage', { movieId: props.id })}
                android_ripple={{ foreground: true, color: 'grey' }}>
                <Image
                    source={{ uri: props.url }}
                    style={[styles.image, props.imageStyles]}
                />
            </Pressable>
        </View >
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