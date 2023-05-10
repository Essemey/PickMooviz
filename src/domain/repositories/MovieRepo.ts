import { Either } from "../../infra/utils/either";
import { Movie, MoviePreview } from "../entities/movie-structures";

export default interface MovieRepo {
    getMovies: (id: string) => Promise<Either<Error, MoviePreview[]>>;
    getMovie: (id: string) => Promise<Either<Error, Movie>>;
}