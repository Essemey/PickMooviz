import { Movie as DomainMovie } from "../../../../../domain/entities/movie-structures";
import { isRight, makeLeft, makeRight, unwrapEither } from "../../../../utils/either";
import request from "../../../../utils/request";
import MovieDataSource from "../../MovieDataSource";
import { Movie, MoviesApiRes } from "./entities/movie-omdb-api-structures";


function formatMovie(obj: any) {
    const newObj: any = {};
    for (const key in obj) {
        key === 'Writer' ?
            newObj[`${key}s`.toLowerCase()] = obj[key].split(' ')
            :
            key === 'Actors' ?
                newObj[key.toLowerCase()] = obj[key].split(' ')
                :
                key === 'imdbID' ?
                    newObj['id'] = obj[key]
                    :
                    key === 'Runtime' ?
                        newObj['duration'] = obj[key]
                        :
                        key === 'Plot' ?
                            newObj['description'] = obj[key]
                            :
                            key === 'Poster' ?
                                newObj['image'] = obj[key]
                                :
                                newObj[key.toLowerCase()] = obj[key];
    }
    return newObj as DomainMovie;
}


export default class MovieOMDbApiDataSourceImpl implements MovieDataSource {

    private apiUrl = 'http://www.omdbapi.com/';
    public apiKey = '23aaa32';
    public apiTypeSearched = 'movie';

    async searchMovies(search: string) {

        const moviesApiRes = await request<Error, MoviesApiRes>(`${this.apiUrl}?apiKey=${this.apiKey}&s=${search}&type=${this.apiTypeSearched}`);

        if (isRight(moviesApiRes)) {
            const movies = unwrapEither(moviesApiRes).Search.map(movie => ({
                id: movie.imdbID,
                title: movie.Title,
                image: movie.Poster,
                year: movie.Year
            }));
            return makeRight(movies);
        }
        return moviesApiRes
    }

    async getMovie(id: string) {

        const movieApiRes = await request<Error, Movie>(`${this.apiUrl}?apiKey=${this.apiKey}&i=${id}`);

        if (isRight(movieApiRes)) {
            const { imdbVotes, imdbRating, Response, Rated, Website, Metascore, Language, DVD, ...restMovie } = unwrapEither(movieApiRes);
            return makeRight(formatMovie(restMovie));
        }
        return movieApiRes;
    }
}