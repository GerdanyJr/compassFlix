import React, { useContext } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { getYear, numberFormatter } from "../../util/formatter";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Movie } from "../../types/Movie";
import { toggleFavorite } from "../../services/database";
import { AuthContext } from "../../store/AuthContext";
import YoutubePlayer from "react-native-youtube-iframe";

interface MovieHeaderProps {
    movie: Movie
}

export function MovieHeader({ movie }: MovieHeaderProps) {
    const authCtx = useContext(AuthContext);
    function getDirector(movie: Movie) {
        return movie.crew.filter(member => member.job === 'Director')[0].name;
    }

    function isFav() {
        return authCtx.favMovies.includes(movie.id);
    }

    async function handleFavoriteClick() {
        const newFavs = await toggleFavorite(authCtx.user!, authCtx.favMovies, movie.id);
        authCtx.setFavMovies(newFavs);
    }

    return (
        <View>
            <Image source={{ uri: movie.backdrop_path }} style={styles.backdropImg} />
            <View style={styles.infoContainer}>
                <Image source={{ uri: movie.poster_path }} style={styles.posterImg} />
                <View style={styles.header}>
                    <View style={styles.movieTitleContainer}>
                        <View style={styles.movieData}>
                            <View style={styles.movieInfoContainer}>
                                <Text style={[styles.movieTitle, styles.primaryText]} numberOfLines={2} ellipsizeMode='tail'>{movie.title}</Text>
                                <Text style={[styles.movieDate, styles.primaryText]}>{`  ${getYear(movie.release_date)}`}</Text>
                            </View>
                            <Text style={[styles.movieDuration, styles.primaryText]}>{movie.runtime} min</Text>
                        </View>
                    </View>
                    <Text style={[styles.diretorContainer, styles.primaryText]}>Direção por <Text style={styles.diretor}>{getDirector(movie)}</Text></Text>
                    <View style={styles.rateContainer}>
                        <Text style={styles.voteAvg}>{numberFormatter.format(movie.vote_average)}/10</Text>
                        <Pressable style={styles.rate} onPress={handleFavoriteClick}>
                            <Ionicons name={isFav() ? "heart" : "heart-outline"}
                                size={28}
                                color={isFav() ? "#e50913" : "grey"} />
                            <Text>{numberFormatter.format(movie.vote_count)}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    primaryText: {
        color: 'white'
    },
    backdropImg: {
        width: '100%',
        height: 175
    },
    infoContainer: {
        flexDirection: 'row',
        paddingHorizontal: 14,
    },
    posterImg: {
        width: 100,
        height: 150,
        borderRadius: 10,
        bottom: '10%'
    },
    header: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        width: '70%'
    },
    movieTitleContainer: {
        flexDirection: 'row'
    },
    movieData: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    movieTitle: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    movieInfoContainer: {
        flexDirection: 'row',
        maxWidth: '70%',
    },
    movieDate: {
        textAlignVertical: 'center'
    },
    movieDuration: {
        fontSize: 12,
        textAlignVertical: 'center'
    },
    diretorContainer: {
        fontSize: 12,
    },
    diretor: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    rateContainer: {
        flexDirection: 'row',
        marginTop: 18,
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    rate: {
        alignItems: "center"
    },
    voteAvg: {
        fontSize: 36,
        color: '#E9A6A6',
        fontWeight: '500'
    }
});