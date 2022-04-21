import axios from "axios";
import IMovieList from "../model/IMovieList";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const getMovieListFromServer = (section: string) => {
    return axios.get<IMovieList[]>(`${BASE_URL}${section}`)
        .then(resp => resp.data);
}

const addToFavourite = (movieItem: Omit<IMovieList, "id">) => {
    return axios.post<IMovieList>(`${BASE_URL}favourite`, movieItem, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(resp => resp.data);
}

const removeFromFavourite = (id: string | number) => {
    return axios.delete<IMovieList>(`${BASE_URL}favourite/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(resp => resp.data);
}

export { getMovieListFromServer, addToFavourite, removeFromFavourite }