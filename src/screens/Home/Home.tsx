import React, { useContext, useLayoutEffect, useState } from 'react';

import { ScrollView, StyleSheet, View } from "react-native";
import { AuthContext } from '../../store/AuthContext';
import { HomeHeader } from './HomeHeader';
import { MoviesScroll } from './MoviesScroll';
import { getHomepageData, getMovies } from '../../services/moviesHttp';
import { urls } from '../../util/urls';
import { HomeMovies } from '../../types/HomeMovies';

export function Home({ navigation }: { navigation: any }): JSX.Element {
    const authCtx = useContext(AuthContext);
    const [popularMovies, setPopularMovies] = useState<HomeMovies>({ movies: [], page: 1, requestUrl: urls.popularMovies });
    const [fantasyMovies, setFantasyMovies] = useState<HomeMovies>({ movies: [], page: 1, requestUrl: urls.moviesByGenre + 14 });
    const [comedyMovies, setComedyMovies] = useState<HomeMovies>({ movies: [], page: 1, requestUrl: urls.moviesByGenre + 35 });
    const [animationMovies, setAnimationMovies] = useState<HomeMovies>({ movies: [], page: 1, requestUrl: urls.moviesByGenre + 16 });

    useLayoutEffect(() => {
        async function fetchHomepageData() {
            const [popular, fantasy, comedy, animation] = await getHomepageData();
            setPopularMovies((prevState) => { return { ...prevState, movies: popular } });
            setFantasyMovies((prevState) => { return { ...prevState, movies: fantasy } });
            setComedyMovies((prevState) => { return { ...prevState, movies: comedy } });
            setAnimationMovies((prevState) => { return { ...prevState, movies: animation } });
        }
        fetchHomepageData();
    }, []);

    async function loadMovies(data: HomeMovies, setFc: React.Dispatch<React.SetStateAction<HomeMovies>>) {
        const fetchedMovies = await getMovies(data.requestUrl, data.page + 1);
        setFc((prevState) => {
            return {
                ...prevState,
                movies: [...prevState.movies, ...fetchedMovies],
                page: prevState.page + 1
            }
        });
    }

    return (
        <View style={styles.container}>
            <HomeHeader username='John' />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
                <MoviesScroll
                    title='Filmes populares'
                    data={popularMovies.movies}
                    onEndReached={() => loadMovies(popularMovies, setPopularMovies)}
                />
                <MoviesScroll
                    title='Filmes de ação'
                    data={fantasyMovies.movies}
                    onEndReached={() => loadMovies(fantasyMovies, setFantasyMovies)}
                />
                <MoviesScroll
                    title='Filmes de comédia'
                    data={comedyMovies.movies}
                    onEndReached={() => loadMovies(comedyMovies, setComedyMovies)}
                />
                <MoviesScroll
                    title='Filmes de animação'
                    data={animationMovies.movies}
                    onEndReached={() => loadMovies(animationMovies, setAnimationMovies)}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    scrollContainer: {
        marginTop: 8,
        gap: 80
    }
});