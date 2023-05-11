import { MoviePreview } from "../entities/movie-structures";
import MoviePickRepo from "../repositories/MoviePickRepo";
import MovieRepo from "../repositories/MovieRepo";

export const getMovies = async (id: string, task: MovieRepo['getMovies']) => task(id);
export const getMovie = async (id: string, task: MovieRepo['getMovie']) => task(id);

export const getPickedMovies = async (task: MoviePickRepo['getPickedMovies']) => task();
export const savePickedMovie = async (movie: MoviePreview, task: MoviePickRepo['savePickedMovie']) => task(movie);

/*export async function pickMovie(movie: {}) {
    await dataSource.Movie.getById()
}

export async function unpickMovie(id: string) {
    await dataSource.Movie.getById()
}*/