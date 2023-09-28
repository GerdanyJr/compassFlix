import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { MovieHeader } from '../components/Movie/MovieHeader';
import { FooterTab } from '../components/Movie/FooterTab';
import { Movie } from '../types/Movie';
import { getSingleMovie } from '../services/moviesHttp';

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
    return isLoading ? (
        <ActivityIndicator />) :
        (<View style={styles.container}>
            <MovieHeader movie={movie!} />
            <View style={styles.movieDataContainer}>
                <Text style={styles.overview}>
                    {movie!.overview}
                </Text>
            </View>
            <FooterTab
                castMembers={movie!.cast}
                movieId={route.params?.movieId}
            />
        </View>)
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    movieDataContainer: {
        paddingHorizontal: 14,
        paddingBottom: 12
    },
    overview: {
        color: 'white',
    }
});