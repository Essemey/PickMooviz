import MovieRepo from "../repositories/MovieRepo";

export const getMovies = async (id: string, task: MovieRepo['getMovies']) => task(id);
export const getMovie = async (id: string, task: MovieRepo['getMovie']) => task(id);


/*export async function getPickedMovie(id: string) {

}

export async function getPickedMovies() {

}

export async function pickMovie(movie: {}) {
    await dataSource.Movie.getById()
}

export async function unpickMovie(id: string) {
    await dataSource.Movie.getById()
}*/