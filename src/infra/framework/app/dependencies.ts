import MoviePickRepo from "../../../domain/repositories/MoviePickRepo";
import MovieRepo from "../../../domain/repositories/MovieRepo";
import MovieDataSource from "../../data/dataSource/MovieDataSource";
import MoviePickDataSource from "../../data/dataSource/MoviePickDataSource";
import MovieOMDbApiDataSourceImpl from "../../data/dataSource/api/movie/MovieOMDbApiDataSourceImpl";
import MoviePickLocalStorageImpl from "../../data/dataSource/storage/moviePick/MoviePickLocalStorageImpl";
import MoviePickRepoImpl from "../../data/repositories/MoviePickRepoImpl";
import MovieRepoImpl from "../../data/repositories/MovieRepoImpl";

//Instanciate a movie repository with a dataSource dependency
const movieApiDataSource: MovieDataSource = new MovieOMDbApiDataSourceImpl();
const movieRepo: MovieRepo = new MovieRepoImpl(movieApiDataSource);

const moviePickApiDataSource: MoviePickDataSource = new MoviePickLocalStorageImpl();
const moviePickRepo: MoviePickRepo = new MoviePickRepoImpl(moviePickApiDataSource);


export const storeExtraArg = {
    movieRepo,
    moviePickRepo
}

export type StoreExtraArg = typeof storeExtraArg;