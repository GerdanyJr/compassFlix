import { ShowcaseMovie } from "./ShowcaseMovie";

export interface HomeMovies {
    movies: ShowcaseMovie[],
    page: number,
    requestUrl: string
}
