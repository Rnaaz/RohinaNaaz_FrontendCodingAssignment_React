import Home from "./global/Home";
import { Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from "react-router-dom";
import MoviesList from "./MoviesList/MoviesList";
import MovieDetails from "./MovieDetails/MovieDetails";

const App = () => {
    return (
        <>
            <Route path="/" exact render={() => (
                <Redirect to="/movies-in-theaters" />
            )}>
            </Route>
            <Route exact path="/:section" component={MoviesList}>
            </Route>
            <Route path="/:section/:name" component={MovieDetails}>
            </Route>
            {/* <Route path="/" component={Home}></Route> */}
        </>

    )
}

export default App;
