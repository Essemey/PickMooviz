import { createSlice } from "@reduxjs/toolkit";
import { Movie, MoviePreview } from "../../../../domain/entities/movie-structures";
import { getMovie, getMovies } from "../thunks/movieThunks";


interface initialState {
    movies: MoviePreview[];
    currentMovie: Movie | null;
    picks: MoviePreview[];
    isLoading: boolean;
    error: Error | null;
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
            .addCase(getMovies.fulfilled, (state, { payload }) => {
                state.movies = payload;
            })
            .addCase(getMovie.fulfilled, (state, { payload }) => {
                state.currentMovie = payload;
            })
    }
})

export default movieSlice.reducer;