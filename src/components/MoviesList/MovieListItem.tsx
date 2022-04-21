import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faClose } from '@fortawesome/free-solid-svg-icons';
import { Card } from "react-bootstrap";
import IMovieList from "../../model/IMovieList";
import { Link } from "react-router-dom";
import "./MovieListItem.css"

type Props = {
    movie: IMovieList,
    favouriteSection: boolean,
    handleFavourite: (movie: IMovieList) => {},
    section: string
}
const MovieListItem = ({ movie, section, favouriteSection, handleFavourite }: Props) => {

    const { title, year, imdbRating, contentRating, averageRating, duration, genres, actors, releaseDate, storyline, posterurl } = movie;

    return (
        <Card style={{ width: '18rem' }} className="hover-effect">
            <Link to={{
                pathname: `/${section}/${movie.title}`,
                state: { movie }
            }}>
                <Card.Img variant="top" src={movie.posterurl} alt="movie" style={{ minHeight: "400px", height: "400px" }} />
            </Link>
            <Card.Body>
                <Card.Title className="text-center">{movie.title}</Card.Title>
                <div className="text-center" style={{ cursor: 'pointer' }} onClick={() => handleFavourite(movie)}>
                    {favouriteSection ? "Remove from favourites" : "Add to favourites"}
                    <span className="px-2" style={{ color: "red" }}>
                        {favouriteSection ? <FontAwesomeIcon icon={faClose} /> : <FontAwesomeIcon icon={faHeart} />}
                    </span>
                </div>
            </Card.Body>
        </Card>
    )
}

export default MovieListItem;
