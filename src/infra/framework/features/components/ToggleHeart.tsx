import { Alert } from "@mui/material";
import { useAppDispatch } from "../../app/redux-hooks";
import { savePickedMovie } from "../thunks/movieThunks";
import { HeartEmptyIcon, HeartFullIcon } from "./HeartSVG";
import { Movie } from "../../../../domain/entities/movie-structures";
import { useEffect, useRef, useState } from "react";

type ToggleHeartProps = {
    movie: Movie;
    error: string | null;
    picks: Movie[];
}

export default function ToggleHeart({ movie, error, picks }: ToggleHeartProps) {

    const dispatch = useAppDispatch();
    const [picked, setPicked] = useState(false);
    const [err, setErr] = useState(false);

    useEffect(() => {
        if (error) setErr(true);
    }, [error])

    useEffect(() => {
        if (picks.find(pick => pick.title === movie.title)) {
            setPicked(true);
        }
    }, [picks])

    const ErrorMessage = () => {

        const timer = useRef<NodeJS.Timeout | null>(null);

        useEffect(() => {

            timer.current = setTimeout(() => setErr(false), 3000);

            return () => clearTimeout(timer.current as NodeJS.Timeout)
        }, []);

        return <Alert sx={{ position: 'absolute', right: '3%' }} severity="warning">{error}</Alert>
    }

    return <div>
        {!picked
            ? <HeartEmptyIcon onClick={() => dispatch(savePickedMovie(movie))} />
            : <HeartFullIcon style={{ color: '#B786CE' }} onClick={() => dispatch(savePickedMovie(movie))} />
        }
        {err && <ErrorMessage />}
    </div>

}
