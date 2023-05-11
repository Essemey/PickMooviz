import { Either } from "../../infra/utils/either";
import { Movie, MoviePreview } from "../entities/movie-structures";

export class MoviePickAlreadyExistError extends Error {

    constructor(message: string) {
        super(message);
        this.name = 'MoviePickAlreadyExistError'
    }
}

export class EmptyMovieTitleError extends Error {

    constructor(message: string) {
        super(message);
        this.name = 'EmptyMovieTitleError'
    }
}

export default interface MoviePickRepo {
    getByFirstLetter: (firstLetter: string) => Promise<string | null>;
    getAll: () => Promise<string[]>;
    pick: (title: string) => Promise<void>;
    getPickedMovies: () => Promise<Either<Error, Movie[]>>;
    savePickedMovie: (movie: Movie) => Promise<Either<Error, Movie['title']>>;
    removePickedMovie: (title: string) => Promise<void>;
}