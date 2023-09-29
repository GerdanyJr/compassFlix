import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { MoviePoster } from "./MoviePoster";
import { getMovies } from "../../services/moviesHttp";
import { ShowcaseMovie } from "../../types/ShowcaseMovie";
import { LoadingOverlay } from "../UI/LoadingOverlay";

interface MoviesScrollProps {
    title: string,
    requestUrl: string
}

export function MoviesScroll(props: MoviesScrollProps) {
    const [movies, setMovies] = useState<ShowcaseMovie[]>([]);
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            (async () => {
                setIsLoading(true);
                await loadMovies();
                setIsLoading(false);
            })();
        }
    }, []);

    async function loadMovies() {
        const fetchedMovies = await getMovies(props.requestUrl, page);
        setPage(prevState => prevState + 1);
        setMovies((prevState) => [...prevState, ...fetchedMovies]);
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{props.title}</Text>
                <Text
                    style={styles.seeMore}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    onPress={() => console.log(props.requestUrl)}
                >Ver mais</Text>
            </View>
            {isLoading && <LoadingOverlay />}
            {!isLoading && <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <MoviePoster id={item.id.toString()} url={item.poster_path} />}
                ItemSeparatorComponent={() => <View style={{ paddingHorizontal: 4 }}></View>}
                showsHorizontalScrollIndicator={false}
                onEndReachedThreshold={0.9}
                onEndReached={() => { movies.length < 200 && loadMovies() }}
                horizontal
            />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        height: 200
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingBottom: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    seeMore: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff'
    }
});