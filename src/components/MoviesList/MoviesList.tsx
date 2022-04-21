import { ChangeEvent, useEffect, useState } from "react";
import IMovieList from "../../model/IMovieList";
import { Row, Col, Navbar, Container, ToastContainer } from "react-bootstrap";
import { getMovieListFromServer, addToFavourite, removeFromFavourite } from "../../service/ApiService";
import Toaster from "../common/Toaster";

import SearchBox from "../global/SearchBox";
import Navigation from "../global/Navigation";
import MovieListItem from "./MovieListItem";

type Props = {
    match: any;
}

type Toaster = {
    toast_status: string,
    toast_msg: string
}
const MoviesList = (props: Props) => {

    let section = props.match.params.section;

    const [movies, setMovies] = useState<IMovieList[]>([]);
    const [toaster, setToaster] = useState<Toaster[]>([]);
    const [searchVal, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState<IMovieList[]>([]);

    useEffect(
        () => {
            const getMovies = async () => {
                const list = await getMovieListFromServer(section);
                setMovies(list);
                filterData(searchVal, list);
            }
            getMovies();
        },
        [section]
    )

    const filterData = (searchTerm: string, data: IMovieList[]) => {
        if (searchTerm !== '') {
            const filteredMovies = data.filter(
                (movie) => movie.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
            )
            setFilteredData(filteredMovies);
        }
        else setFilteredData(data);
    }

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value;
        setSearch(searchTerm);
        filterData(searchTerm, movies);
    }
    const handleFavorite = async (movie: IMovieList) => {

        if (section === 'favourite') {
            const data = await removeFromFavourite(movie.id);
            setToaster([...toaster, { toast_status: 'Success', toast_msg: `Successfully removed from favourite` }]);
            const remainingItemsAfterDelete = movies.filter(data => data.id !== movie.id);
            setMovies(remainingItemsAfterDelete);
            filterData(searchVal,remainingItemsAfterDelete);
        }

        else {
            const favouriteMoviesList = await getMovieListFromServer('favourite');
            const movieAlreadyExist = favouriteMoviesList.filter(data => data.title === movie.title);
            if (movieAlreadyExist.length === 0) {
                const { id, ...movieWithoutId } = movie;
                const data = await addToFavourite(movieWithoutId);
                setToaster([...toaster, { toast_status: 'Success', toast_msg: 'Successfully added to favourite' }]);
            }
            else {
                setToaster([...toaster, { toast_status: 'Error', toast_msg: 'Already added in favourite' }]);
            }
        }

    }

    const favouriteSection = section === "favourite" ? true : false;
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navigation />
                    <SearchBox searchVal={searchVal} handleSearch={handleSearch} />
                </Container>
            </Navbar>
            <Container className="my-5">
                <section>
                        <header>{favouriteSection ? <h1>Favourite</h1> : <h1>Movies</h1>}</header>
                
                </section>
                <ToastContainer className="p-3" style={{ zIndex: 2, position: "fixed", right: "50px", top: "50px" }}>
                    {
                        (toaster.length !== 0) && toaster.map((toast, idx) => {
                            const { toast_msg, toast_status } = toast;
                            return (
                                <Toaster key={idx} toast_msg={toast_msg} toast_status={toast_status} />

                            )

                        })
                    }
                </ToastContainer>


                {
                    filteredData.length > 0 ?

                        (
                            <Row xs={1} md={2} lg={4}>
                                {
                                    filteredData.map(
                                        (movie, idx) => {
                                            return (
                                                <Col key={idx} className="d-flex align-items-stretch my-3">
                                                    <MovieListItem movie={movie} favouriteSection={favouriteSection} handleFavourite={handleFavorite} section={section} />
                                                </Col>
                                            )
                                        }
                                    )
                                }
                            </Row>

                        )

                        :
                        (

                            <div className="d-flex justify-content-center align-items-center" style={{height:"50vh"}}>
                                <h2>No Movies Found.</h2>
                            </div>
                        )

                }


            </Container>
        </>

    )
}

export default MoviesList;