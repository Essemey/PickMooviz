import { Alert } from "@mui/material";
import { useAppDispatch } from "../../app/redux-hooks";
import { savePickedMovie } from "../thunks/movieThunks";
import { HeartEmptyIcon, HeartFullIcon } from "./HeartSVG";
import { Movie } from "../../../../domain/entities/movie-structures";
import { useEffect, useState } from "react";

type ToggleHeartProps = {
    movie: Movie;
    error: string | null;
    picks: Movie[];
}

export default function ToggleHeart({ movie, error, picks }: ToggleHeartProps) {

    const dispatch = useAppDispatch();
    const [picked, setPicked] = useState(false)

    useEffect(() => {
        if (picks.find(pick => pick.title === movie.title)) {
            setPicked(true)
        }
    }, [picks])

    return <div>
        {!picked
            ? <HeartEmptyIcon onClick={() => dispatch(savePickedMovie(movie))} />
            : <HeartFullIcon style={{ color: '#B786CE' }} onClick={() => dispatch(savePickedMovie(movie))} />
        }
        {error && <Alert severity="warning">{error}</Alert>}
    </div>

}
