import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMovies as getMoviesUseCase, getMovie as getMovieUseCase } from "../../../../domain/interactors/movie-useCases";
import { StoreExtraArg } from "../../app/dependencies";
import { Movie, MoviePreview } from "../../../../domain/entities/movie-structures";


type ThunkApi = {
    rejectValue: string;
    extra: StoreExtraArg;
}

/*I decided to directly pass the repo method "getMovies" to getMovieUseCase but it's possible to pass just the repo
and call the method from the useCase. I chose to pass just the function because if we got many method in the object it can be
useless to pass a "big" object. 
*/
export const getMovies = createAsyncThunk<MoviePreview[], string, ThunkApi>(
    'movie/getMovies',
    async (search, { extra }) => {
        const getMovies = extra.movieRepo.getMovies.bind(extra.movieRepo);
        return getMoviesUseCase(search, getMovies);
    }
);

export const getMovie = createAsyncThunk<Movie, string, ThunkApi>(
    'movie/getMovie',
    async (search, { extra }) => {
        const getMovie = extra.movieRepo.getMovie.bind(extra.movieRepo);
        return getMovieUseCase(search, getMovie);
    }
);