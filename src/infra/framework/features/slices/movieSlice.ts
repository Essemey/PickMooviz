import { createSlice } from "@reduxjs/toolkit";
import { Movie, MoviePreview } from "../../../../domain/entities/movie-structures";
import { getMovie, getMovies } from "../thunks/movieThunks";


interface initialState {
    movies: MoviePreview[];
    currentMovie: Movie | null;
    picks: MoviePreview[];
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
            .addCase(getMovie.pending, (state, { payload }) => {
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
    }
})

export default movieSlice.reducer;