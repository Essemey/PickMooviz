import React from 'react'
import PropTypes from 'prop-types'
import { MoviePreview } from '../../../../domain/entities/movie-structures';
import { Alert, CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import styles from '../styles/MovieSearchResult.module.css'

type MovieSearchResultProps = {
    movies: MoviePreview[];
    search: string;
    handleMovieDisplaying: (id: string) => void;
    isLoading: boolean;
    error: string | null;
}

const style = {
    position: 'absolute' as 'absolute',
    width: '100%'
};

export default function MovieSearchResult({ movies, isLoading, search, handleMovieDisplaying, error }: MovieSearchResultProps) {

    if (!search) {
        return null;
    }

    if (!movies.length && error) {
        return <Alert sx={style} severity="info">{error}</Alert>
    }

    if (!movies.length) {
        return null;
    }

    return <List className={styles.results} sx={{ paddingTop: '0px', paddingBottom: '0px', position: 'absolute' }}>
        {movies?.map(movie =>
            <ListItem key={movie.id} onClick={() => handleMovieDisplaying(movie.id)}>
                {movie.title}-{movie.id}
            </ListItem>)}
    </List>
}

