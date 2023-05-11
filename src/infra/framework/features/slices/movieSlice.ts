import { createSlice } from "@reduxjs/toolkit";
import { Movie, MoviePreview } from "../../../../domain/entities/movie-structures";
import { getMovie, getMovies, getPickedMovies, savePickedMovie } from "../thunks/movieThunks";


interface initialState {
    movies: MoviePreview[];
    currentMovie: Movie | null;
    picks: Movie[];
    isLoading: boolean;
    error: string | null;
}

const initialState: initialState = {
    movies: [],
    currentMovie: null,
    picks: [],
    isLoading: false,
    error: null,
}

const movieSlice = createSlice({
    name: 'movie',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            /*---------------------------GET-MOVIES-------------------------------------*/
            .addCase(getMovies.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getMovies.rejected, (state, { payload }) => {
                state.movies = [];
                state.error = payload || 'An error occurs while loading movies';
                state.isLoading = false;
            })
            .addCase(getMovies.fulfilled, (state, { payload }) => {
                state.movies = payload;
                state.isLoading = false;
                state.error = null;
            })
            /*-----------------------------GET-MOVIE-------------------------------------*/
            .addCase(getMovie.pending, state => {
                state.isLoading = true;
                state.error = null;
            }).addCase(getMovie.rejected, (state, { payload }) => {
                state.error = payload || 'An error occurs while loading movie';
                state.isLoading = false;
            })
            .addCase(getMovie.fulfilled, (state, { payload }) => {
                state.currentMovie = payload;
                state.isLoading = false;
                state.error = null;
            })
            /*-----------------------------GET-PICKED-MOVIES-------------------------------------*/
            .addCase(getPickedMovies.pending, state => {
                state.isLoading = true;
                state.error = null;
            }).addCase(getPickedMovies.rejected, (state, { payload }) => {
                state.error = payload || 'An error occurs while getting picks';
                state.isLoading = false;
            })
            .addCase(getPickedMovies.fulfilled, (state, { payload }) => {
                state.picks = payload;
                state.isLoading = false;
                state.error = null;
            })
            /*-----------------------------SAVE-PICKED-MOVIE-------------------------------------*/
            .addCase(savePickedMovie.pending, state => {
                state.error = null;
            }).addCase(savePickedMovie.rejected, (state, { payload }) => {
                state.error = payload || 'An error occurs while saving pick';
                state.isLoading = false;
            })
            .addCase(savePickedMovie.fulfilled, (state, { meta }) => {
                state.picks.push(meta.arg)
                state.isLoading = false;
                state.error = null;
            })
    }
})

export default movieSlice.reducer;