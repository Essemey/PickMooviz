import { Movie, MoviePreview } from "../entities/movie-structures";

export default interface MovieRepo {
    getMovies: (id: string) => Promise<MoviePreview[]>;
    getMovie: (id: string) => Promise<Movie>;
}