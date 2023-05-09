import { Input, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./infra/framework/app/redux-hooks";
import { getMovie, getMovies } from "./infra/framework/features/thunks/movieThunks";


function App() {

  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();
  const { movies, currentMovie } = useAppSelector(state => state);

  const handleSearch = () => {

    return (e: React.ChangeEvent<HTMLInputElement>): void => {
      setSearch(e.target.value);
    }
  }

  useEffect(() => {
    if (search) dispatch(getMovies(search));
  }, [search]);

  /*if (!movies.length) {
    return <div>No movies</div>
  }*/

  return <div>
    <Typography variant="h1">PickMooviz</Typography>
    <TextField fullWidth placeholder="Search a movie..." value={search} onChange={handleSearch()} />
    <ul>
      {movies?.map(movie => <li key={movie.id} onClick={() => dispatch(getMovie(movie.id))}>{movie.title}-{movie.id}</li>)}
    </ul>
    <img src={currentMovie?.image} />
  </div>;
}

export default App;
