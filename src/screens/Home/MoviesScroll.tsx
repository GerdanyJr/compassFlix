import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { MoviePoster } from "./MoviePoster";
import { ShowcaseMovie } from "../../types/ShowcaseMovie";

interface MoviesScrollProps {
    title: string,
    data: ShowcaseMovie[],
    onEndReached?: () => void
}

export function MoviesScroll(props: MoviesScrollProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{props.title}</Text>
            <FlatList
                data={props.data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <MoviePoster id={item.id} url={item.poster_path} />}
                ItemSeparatorComponent={() => <View style={{ paddingHorizontal: 4 }}></View>}
                horizontal
                showsHorizontalScrollIndicator={false}
                onEndReachedThreshold={0.9}
                onEndReached={props.onEndReached}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12
    },
    title: {
        fontSize: 20,
        paddingBottom: 4,
        fontWeight: 'bold',
        color: '#ffffff'
    }
});