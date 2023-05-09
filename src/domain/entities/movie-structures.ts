export interface MoviePreview {
    id: string;
    title: string;
    image: string;
    year: string;
}

export interface MovieDetails {
    actors: string[];
    awards: string;
    boxOffice: string;
    country: string;
    description: string;
    director: string;
    production: string;
    ratings: Rating[];
    released: string;
    duration: string;
    writers: string[];
    genre: string[];
}

export type Movie = MoviePreview & MovieDetails;

export type Rating = { source: string; note: string; }