import axios from "axios";
import { ShowcaseMovie } from "../types/ShowcaseMovie";
import { urls } from "../util/urls";

const API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTczNWZkN2MwZmZjNTIyMzE2Njg4MzE5ZDYwYWFiOSIsInN1YiI6IjY0ZjQwZWNkOTdhNGU2MDBmZWFhMTAyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1rrUoPj_toPiWn3hZ_vUJhOYxfr5WLZfLDfhgZJQ_jY';
const imgUrl = 'https://image.tmdb.org/t/p/w500/';


export async function getMovies(url: string, page: number = 1) {
    const response = await axios.get(`${url}&page=${page}`, {
        headers: {
            Authorization: API_KEY
        }
    });
    const responseMovies: ShowcaseMovie[] = response.data.results;
    const movies: ShowcaseMovie[] = responseMovies.map((movie) => { return { ...movie, poster_path: imgUrl + movie.poster_path } });
    return movies
}

export async function getHomepageData() {
    const [popularMovies, actionMovies, comedyMovies, animationMovies] = await Promise.all([
        getMovies(urls.popularMovies),
        getMovies(urls.moviesByGenre + 14),
        getMovies(urls.moviesByGenre + 35),
        getMovies(urls.moviesByGenre + 16),
    ]);
    return [popularMovies, actionMovies, comedyMovies, animationMovies];
}