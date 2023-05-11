import { Movie, MoviePreview } from "../../../domain/entities/movie-structures";
import MoviePickRepo, { EmptyMovieTitleError, MoviePickAlreadyExistError } from "../../../domain/repositories/MoviePickRepo";
import { makeLeft, makeRight } from "../../utils/either";
import MoviePickDataSource from "../dataSource/MoviePickDataSource";


export default class MoviePickRepoImpl implements MoviePickRepo {

    private dataSource: MoviePickDataSource;

    constructor(_datasource: MoviePickDataSource) {
        this.dataSource = _datasource;
        this.getPickedMovies = this.getPickedMovies.bind(this);
        this.savePickedMovie = this.savePickedMovie.bind(this);
        this.removePickedMovie = this.removePickedMovie.bind(this);
    }

    async getByFirstLetter(firstLetter: string) {

        return this.dataSource.getByFirstLetter(firstLetter);
    }

    async getAll() {

        return this.dataSource.getAll();
    }


    async pick(title: string) {
        try {
            await this.dataSource.put(title);
        } catch (err) {
            throw err;
        }
    }


    async getPickedMovies() {

        return this.dataSource.getPickedMovies();
    }

    async savePickedMovie(movie: Movie) {


        return this.dataSource.savePickedMovie(movie);
    }

    async removePickedMovie(title: string) {

        this.dataSource.removePickedMovie(title);
    }
}