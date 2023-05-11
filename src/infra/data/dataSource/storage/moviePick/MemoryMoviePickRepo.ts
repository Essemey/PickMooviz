import { Movie, MoviePreview } from "../../../../../domain/entities/movie-structures";
import { EmptyMovieTitleError, MoviePickAlreadyExistError } from "../../../../../domain/repositories/MoviePickRepo";
import { makeLeft, makeRight } from "../../../../utils/either";
import MoviePickDataSource from "../../MoviePickDataSource";


export class MemoryMoviePickRepo implements MoviePickDataSource {

  private readonly byFirstLetter = new Map<string, string>();

  constructor() {
    this.put = this.put.bind(this);
  }

  async getByFirstLetter(firstLetter: string) {
    return this.byFirstLetter.get(firstLetter.toUpperCase()) ?? null;
  }

  async getAll() {
    return [...this.byFirstLetter.values()];
  }

  async put(title: string) {
    if (title.length) {
      if (this.byFirstLetter.has(title[0].toUpperCase())) throw new MoviePickAlreadyExistError('You have already a pick for this letter');
      this.byFirstLetter.set([...title][0].toUpperCase(), title);
    } else {
      throw new EmptyMovieTitleError('You cannot send an empty title');
    }
  }

  /*------------------------------------------NEED TO ADAPT TO THE MAP----------------------------------------------------*/
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
