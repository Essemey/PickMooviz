export interface MoviePreview {
    imdbID: string;
    Title: string;
    Poster: string;
    Type: string;
    Year: string;
}

export interface MovieDetails {
    Actors: string;
    Awards: string;
    BoxOffice: string;
    Country: string;
    DVD: string;
    Director: string;
    Genre: string;
    Language: string;
    Metascore: string;
    Plot: string;
    Production: string;
    Rated: string;
    Ratings: Rating[];
    Released: string;
    Response: string;
    Runtime: string;
    Website: string;
    Writer: string;
    imdbRating: string;
    imdbVotes: string;
}

export interface MoviesApiRes {
    Response: string;
    Search: MoviePreview[];
    totalResults: string;
}

export type Movie = MoviePreview & MovieDetails;

export type Rating = { Source: string; Value: string; }