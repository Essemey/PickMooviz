import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getMovies as getMoviesUseCase,
    getMovie as getMovieUseCase,
    getPickedMovies as getPickedMoviesUseCase,
    savePickedMovie as savePickedMovieUseCase
} from "../../../../domain/interactors/movie-useCases";
import { StoreExtraArg } from "../../app/dependencies";
import { Movie, MoviePreview } from "../../../../domain/entities/movie-structures";
import { isRight, unwrapEither } from "../../../utils/either";
import { RejectedWithValueActionFromAsyncThunk } from "@reduxjs/toolkit/dist/matchers";

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
    async (search, { extra, rejectWithValue }) => {

        const res = await getMoviesUseCase(search, extra.movieRepo.getMovies);
        return isRight(res) ? unwrapEither(res) : rejectWithValue(unwrapEither(res).message);
    }
);

export const getMovie = createAsyncThunk<Movie, string, ThunkApi>(
    'movie/getMovie',
    async (search, { extra, rejectWithValue }) => {

        const res = await getMovieUseCase(search, extra.movieRepo.getMovie);
        return isRight(res) ? unwrapEither(res) : rejectWithValue(unwrapEither(res).message);
    }
);

export const getPickedMovies = createAsyncThunk<Movie[], void, ThunkApi>(
    'movie/pick/getPickedMovie',
    async (_, { extra, rejectWithValue }) => {

        const res = await getPickedMoviesUseCase(extra.moviePickRepo.getPickedMovies);
        return isRight(res) ? unwrapEither(res) : rejectWithValue(unwrapEither(res).message);
    }
);

export const savePickedMovie = createAsyncThunk<Movie['title'], Movie, ThunkApi>(
    'movie/pick/savePickedMovie',
    async (movie, { extra, rejectWithValue }) => {

        const res = await savePickedMovieUseCase(movie, extra.moviePickRepo.savePickedMovie);
        return isRight(res) ? unwrapEither(res) : rejectWithValue(unwrapEither(res).message);
    }
);
