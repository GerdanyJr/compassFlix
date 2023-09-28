import { Actor } from "./Actor";
import { Categories } from "./Categories";
import { Company } from "./Company";
import { CrewMember } from "./CrewMember";

export interface Movie {
    genres: Array<Categories>;
    production_companies: Array<Company>;
    cast: Array<Actor>;
    crew: Array<CrewMember>;
    spoken_languages: Array<{ english_name: string; iso_639_1: string; name: string }>;
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: null | object;
    budget: number;
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
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
