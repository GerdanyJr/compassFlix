import { Categories } from "./Categories";

export interface ResponseMovie {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: any | null;
    budget: number;
    genres: Categories[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_countries: Array<{ iso_3166_1: string; name: string }>;
    spoken_languages: Array<{ english_name: string; iso_639_1: string; name: string }>;
    release_date: string;
    revenue: number;
    runtime: number;
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}