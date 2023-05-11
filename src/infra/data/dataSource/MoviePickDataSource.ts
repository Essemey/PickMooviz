import { Movie, MoviePreview } from "../../../domain/entities/movie-structures";
import { Either } from "../../utils/either";


export default interface MoviePickDataSource {
    getByFirstLetter: (firstLetter: string) => Promise<string | null>;
    getAll: () => Promise<string[]>;
    put: (title: string) => Promise<void>;
    getPickedMovies: () => Promise<Either<Error, Movie[]>>;
    savePickedMovie: (movie: Movie) => Promise<Either<Error, Movie['title']>>;
    removePickedMovie: (title: string) => Promise<void>;
}