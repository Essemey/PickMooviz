import { MoviePreview } from "../../../domain/entities/movie-structures";


export default interface MoviePickRepo {
    getPickedMovie: (id: string) => Promise<MoviePreview>;
    getPickedMovies: () => Promise<MoviePreview[]>;
    savePickedMovie: (movie: MoviePreview) => Promise<void>;
    removePickedMovie: (id: string) => Promise<void>;
}