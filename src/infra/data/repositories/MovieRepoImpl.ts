import MovieRepo from "../../../domain/repositories/MovieRepo";
import MovieDataSource from "../dataSource/MovieDataSource";


export default class MovieRepoImpl implements MovieRepo {

    private dataSource: MovieDataSource;

    constructor(_datasource: MovieDataSource) {
        this.dataSource = _datasource;
        this.getMovies = this.getMovies.bind(this);
        this.getMovie = this.getMovie.bind(this);
    }

    async getMovies(id: string) {

        return this.dataSource.searchMovies(id);
    }

    async getMovie(id: string) {

        return this.dataSource.getMovie(id);
    }
}