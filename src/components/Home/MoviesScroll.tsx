import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { MoviePoster } from "./MoviePoster";
import { getMovies } from "../../services/moviesHttp";
import { ShowcaseMovie } from "../../types/ShowcaseMovie";

interface MoviesScrollProps {
    title: string,
    requestUrl: string
}

export function MoviesScroll(props: MoviesScrollProps) {
    const [movies, setMovies] = useState<ShowcaseMovie[]>([]);
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    useEffect(() => {
        if (!isLoading) {
            (async () => {
                await loadMovies();
            })();
        }
    }, []);

    async function loadMovies() {
        setIsLoading(true);
        const fetchedMovies = await getMovies(props.requestUrl, page);

        setPage(prevState => prevState + 1);
        setMovies((prevState) => [...prevState, ...fetchedMovies]);
        setIsLoading(false);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{props.title}</Text>
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <MoviePoster id={item.id} url={item.poster_path} />}
                ItemSeparatorComponent={() => <View style={{ paddingHorizontal: 4 }}></View>}
                showsHorizontalScrollIndicator={false}
                onEndReachedThreshold={0.9}
                onEndReached={loadMovies}
                horizontal
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