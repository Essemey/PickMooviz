//Interface qui permet de rendre abstraites les différentes méthodes des différentes sources (API ou storage)

import { Movie, MoviePreview } from "../../../domain/entities/movie-structures";
import { Either } from "../../utils/either";

export default interface MovieDataSource {
    searchMovies: (id: string) => Promise<Either<Error, MoviePreview[]>>;
    getMovie: (id: string) => Promise<Either<Error, Movie>>;
}