import { Movie, MoviePreview } from "../../../../../domain/entities/movie-structures";
import { EmptyMovieTitleError, MoviePickAlreadyExistError } from "../../../../../domain/repositories/MoviePickRepo";
import { makeLeft, makeRight } from "../../../../utils/either";
import MoviePickDataSource from "../../MoviePickDataSource";


export default class MoviePickLocalStorageImpl implements MoviePickDataSource {

    async getByFirstLetter(firstLetter: string) {

        return localStorage.getItem(firstLetter.toUpperCase());
    }

    async getAll() {
        const picks = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) {
                const jsonMovie = localStorage.getItem(key);
                if (jsonMovie) {
                    const movie = JSON.parse(jsonMovie) as MoviePreview;
                    picks.push(movie.title);
                }
            }
        }
        return picks;
    }


    async put(title: string) {
        if (title.length) {
            if (localStorage.getItem(title[0].toUpperCase())) throw new MoviePickAlreadyExistError('You have already a pick for this letter');
            localStorage.setItem(title[0].toUpperCase(), title);
        } else {
            throw new EmptyMovieTitleError('You cannot send an empty title');
        }
    }


    async getPickedMovies() {
        const picks = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) {
                const jsonMovie = localStorage.getItem(key);
                if (jsonMovie) {
                    const movie = JSON.parse(jsonMovie) as Movie;
                    picks.push(movie);
                }
            }
        }
        if (!picks.length) return makeLeft(new Error('You have not picks, choose a movie and pick it !'));
        return makeRight(picks);
    }

    async savePickedMovie(movie: Movie) {
        if (localStorage.getItem(movie.title[0].toUpperCase())) {
            return makeLeft(new MoviePickAlreadyExistError('You have already a pick for this letter'));
        }
        localStorage.setItem(movie.title[0].toUpperCase(), JSON.stringify(movie));
        return makeRight(movie.title);
    }

    async removePickedMovie(title: string) {
        localStorage.removeItem(title.toUpperCase());
    }

}