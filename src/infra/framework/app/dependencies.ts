import MovieRepo from "../../../domain/repositories/MovieRepo";
import MovieDataSource from "../../data/dataSource/MovieDataSource";
import MovieOMDbApiDataSourceImpl from "../../data/dataSource/api/movie/MovieOMDbApiDataSourceImpl";
import MovieRepoImpl from "../../data/repositories/MovieRepoImpl";

//Instanciate a movie repository with a dataSource dependency
const movieApiDataSource: MovieDataSource = new MovieOMDbApiDataSourceImpl();
const movieRepo: MovieRepo = new MovieRepoImpl(movieApiDataSource);


export const storeExtraArg = {
    movieRepo
}

export type StoreExtraArg = typeof storeExtraArg;