import axios from "axios";
import {
    get_all_diets
} from "./actions";

export function getAllDiets() {
    return dispatch => {
        axios.get("http://localhost:3001/diets")
            .then(response => {
                const diets = response.data;
                dispatch(get_all_diets(diets));
            })
            .catch(error => {
                console.log(error);
            });
    }
}