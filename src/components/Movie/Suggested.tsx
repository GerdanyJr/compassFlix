import React, { memo, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from "react-native";
import { ShowcaseMovie } from '../../types/ShowcaseMovie';
import { MoviePoster } from '../Home/MoviePoster';
import { getSuggestions } from '../../services/moviesHttp';

export const Suggested = memo(({ movieId }: { movieId: string }) => {
    const [suggestedMovies, setSuggestedMovies] = useState<ShowcaseMovie[]>([]);
    const [page, setPage] = useState(1);
    useEffect(() => {
        async function fetchMovie() {
            const fetchedMovie = await getSuggestions(movieId, page);
            setSuggestedMovies(fetchedMovie);
            setPage(prevState => prevState + 1);
        }
        fetchMovie();
    }, []);
    return (
        <View style={styles.container}>
            <FlatList
                data={suggestedMovies}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                renderItem={({ item }) =>
                    <MoviePoster
                        id={item.id.toString()}
                        url={item.poster_path}
                        pressableStyles={styles.movieStyle}
                        imageStyles={styles.movieImage}
                    />}
                ItemSeparatorComponent={() => <View style={{ padding: 2 }}></View>
                }
            />
        </View>
    );
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 18,
        alignItems: 'center'
    },
    movieStyle: {
        marginHorizontal: 2
    },
    movieImage: {
        height: 175,
        width: 115
    }
});