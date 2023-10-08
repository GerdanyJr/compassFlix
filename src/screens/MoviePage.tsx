import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { MovieHeader } from '../components/Movie/MovieHeader';
import { FooterTab } from '../components/Movie/FooterTab';
import { Movie } from '../types/Movie';
import { getSingleMovie } from '../services/moviesHttp';
import { LoadingOverlay } from '../components/UI/LoadingOverlay';

export function MoviePage({ route }: { route: any }) {
    const [movie, setMovie] = useState<Movie>();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function fetchMovie() {
            const fetchedMovie = await getSingleMovie(route.params?.movieId);
            setMovie(fetchedMovie);
            setIsLoading(false);
        }
        fetchMovie();
    }, []);

    function Movie() {
        return (
            <View style={styles.container}>
                <MovieHeader movie={movie!} />
                <View style={styles.movieDataContainer}>
                    <FooterTab
                        movie={movie!}
                        castMembers={movie!.cast}
                        movieId={route.params?.movieId}
                    />
                </View>
            </View>
        )
    }
    return (
        <>
            {isLoading && <LoadingOverlay />}
            {!isLoading && <Movie />}
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    movieDataContainer: {
        flex: 1,
        paddingBottom: 4
    },
});