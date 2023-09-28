import axios from "axios";
import { ShowcaseMovie } from "../types/ShowcaseMovie";
import { Categories } from "../types/Categories";
import { urls } from "../util/urls";
import { Movie } from "../types/Movie";
import { ResponseMovie } from "../types/ResponseMovie";

const API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTczNWZkN2MwZmZjNTIyMzE2Njg4MzE5ZDYwYWFiOSIsInN1YiI6IjY0ZjQwZWNkOTdhNGU2MDBmZWFhMTAyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1rrUoPj_toPiWn3hZ_vUJhOYxfr5WLZfLDfhgZJQ_jY';
const imgUrl = 'https://image.tmdb.org/t/p/w300/';
const originalmgUrl = 'https://image.tmdb.org/t/p/original/';

export async function getMovies(url: string, page: number) {
    const response = await axios.get(`${url}&page=${page}`, {
        headers: {
            Authorization: API_KEY
        }
    });
    const responseMovies: ShowcaseMovie[] = response.data.results;
    const movies: ShowcaseMovie[] = responseMovies.map((movie) => { return { ...movie, poster_path: imgUrl + movie.poster_path } });
    return movies
}

async function getMovieData(movieId: string) {
    const response = await axios.get(`${urls.movieDetails}${movieId}?language=PT-BR`, {
        headers: {
            Authorization: API_KEY
        }
    });
    const responseMovie: ResponseMovie = response.data;
    const movies: ResponseMovie = { ...responseMovie, poster_path: imgUrl + responseMovie.poster_path, backdrop_path: originalmgUrl + responseMovie.backdrop_path };
    return movies;
}

async function getMovieCast(movieId: string) {
    const response = await axios.get(`${urls.movieDetails}${movieId}/credits?language=PT-BR`, {
        headers: {
            Authorization: API_KEY
        }
    });
    return [response.data.cast, response.data.crew];
}

export async function getCategories() {
    const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list?language=PT-BR', {
        headers: {
            Authorization: API_KEY
        }
    });
    const categories: Categories[] = response.data.genres;
    return categories;
}

export async function getSingleMovie(movieId: string) {
    const [movieDetails, credits] = await Promise.all([getMovieData(movieId), getMovieCast(movieId)]);
    const movie: Movie = {
        ...movieDetails, cast: credits[0], crew: credits[1]
    };
    return movie;
}

export async function getSuggestions(movieId: string, page: number) {
    const response = await axios.get(`${urls.movieDetails}${movieId}/similar?page=${page}`, {
        headers: {
            Authorization: API_KEY
        }
    });
    const responseMovies: ShowcaseMovie[] = response.data.results;
    const movies: ShowcaseMovie[] = responseMovies.map((movie) => { return { ...movie, poster_path: imgUrl + movie.poster_path } });
    return movies
}