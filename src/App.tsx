import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./infra/framework/app/redux-hooks";
import { getMovie, getMovies, getPickedMovies } from "./infra/framework/features/thunks/movieThunks";
import MovieCard from "./infra/framework/features/components/Movie";
import MovieSearchResult from "./infra/framework/features/components/MovieSearchResult";


function App() {

  const [search, setSearch] = useState('');
  const [isMovieDisplayed, setMovieDisplaying] = useState(false);

  const dispatch = useAppDispatch();
  const { movies, currentMovie, isLoading, error, picks } = useAppSelector(state => state);

  const handleClose = () => setMovieDisplaying(false);

  const handleMovieDisplaying = (id: string) => {
    dispatch(getMovie(id));
    setMovieDisplaying(true);
  }

  const handleSearch = () => {

    return (e: React.ChangeEvent<HTMLInputElement>): void => {
      setSearch(e.target.value);
    }
  }

  useEffect(() => {
    dispatch(getPickedMovies());
  }, [])

  useEffect(() => {
    if (search) dispatch(getMovies(search));
  }, [search]);


  return <main>
    <h1>PickMooviz</h1>
    <div className="search_bar">
      <TextField fullWidth type="search" placeholder="Search a movie..." value={search} onChange={handleSearch()} />
      <MovieSearchResult isLoading={isLoading} error={error} search={search} movies={movies} handleMovieDisplaying={handleMovieDisplaying} />
    </div>
    <MovieCard open={isMovieDisplayed} handleClose={handleClose} picks={picks}
      movie={currentMovie} isLoading={isLoading} error={error} />
  </main>;
}

export default App;
