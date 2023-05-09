//Interface qui permet de rendre abstraites les différentes méthodes des différentes sources (API ou storage)

import { Movie, MoviePreview } from "../../../domain/entities/movie-structures";

export default interface MovieDataSource {
    searchMovies: (id: string) => Promise<MoviePreview[]>
    getMovie: (id: string) => Promise<Movie>
}