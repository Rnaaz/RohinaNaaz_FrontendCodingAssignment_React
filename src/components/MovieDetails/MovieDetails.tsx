import { useState } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { RouteComponentProps, Link } from "react-router-dom";


type Props = RouteComponentProps<{ name: string }>;

const MovieDetails = (props: Props) => {


    let movieObj: any = props.location.state;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { title, year, imdbRating, contentRating, averageRating, duration, genres, actors, releaseDate, storyline, posterurl } = movieObj.movie;
    const movieDetails = [
        {
            header: "Title",
            content: title
        },
        {
            header: "Year",
            content: year
        },
        {
            header: "ImdbRating",
            content: imdbRating
        },
        {
            header: "ContentRating",
            content: contentRating
        },
        {
            header: "AverageRating",
            content: averageRating
        },
        {
            header: "Duration",
            content: duration
        },
        {
            header: "Genres",
            content: genres.toString()
        },
        {
            header: "Release Date",
            content: releaseDate
        },
        {
            header: "Description",
            content: storyline
        },
        {
            header: "Cast",
            content: actors.toString()
        }
    ];

    return (
        <>
            <Container className="mx-5">
                <div className="mt-5">
                    <Link to="/">Back To Home</Link>

                </div>
                <hr></hr>
                <Row>
                    <Col xs={12} lg={3}>
                        <img src={posterurl}
                            alt={movieObj.title}
                            className="w-100"
                            onClick={handleShow}
                        />
                    </Col>
                    <Col xs={12} lg={9} className="">
                        <h1>{title}({year})</h1>
                        <table>
                            <tbody>
                                {
                                    movieDetails.map(
                                        movie => {
                                            return (
                                                <tr>
                                                    <td><h6>{movie.header}</h6></td>
                                                    <td style={{ paddingLeft: "10%" }}>{movie.content}</td>
                                                </tr>
                                            )
                                        }
                                    )
                                }
                            </tbody>
                        </table>
                    </Col>
                </Row>
                <Modal centered show={show} onHide={handleClose}>
                    <img src={posterurl} alt="Image" />
                </Modal>
            </Container>
        </>
    )
}

export default MovieDetails;