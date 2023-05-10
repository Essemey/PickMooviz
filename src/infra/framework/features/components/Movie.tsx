import { Box, CircularProgress, Modal, Typography } from "@mui/material";
import { Movie } from "../../../../domain/entities/movie-structures";
import styles from '../styles/Movie.module.css';
import { HeartEmptyIcon } from "./HeartSVG";

type MovieCardProps = {
    open: boolean;
    handleClose: () => void;
    movie: Movie | null;
    isLoading: boolean;
}

export default function MovieCard({ open, handleClose, movie, isLoading }: MovieCardProps) {

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400
    };


    return <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        {!isLoading ?
            <div className={styles.modal_content}>
                <img src={movie?.image} />
                <div className={styles.modal_details}>
                    <header>
                        <h2>{movie?.title}</h2>
                        <HeartEmptyIcon />
                    </header>
                    <div>
                        <p className={styles.description}>{movie?.description}</p>
                        <ul>
                            <li><span className={styles.label}>Actors:</span> {movie?.actors.map((actor, i) => <span key={i}>{actor}</span>)}</li>
                            <li><span className={styles.label}>Writers:</span> {movie?.writers.map((writer, i) => <span key={i}>{writer}</span>)}</li>
                            <li><span className={styles.label}>Director:</span> {movie?.director}</li>
                            <li><span className={styles.label}>Duration:</span> {movie?.duration}</li>
                        </ul>
                    </div>
                </div>
            </div>
            : <CircularProgress sx={style} />
        }
    </Modal>
}