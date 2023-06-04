import axios from "axios";
import {
    get_all_recipes
} from "./actions";

export function getAllRecipes() {
    return dispatch => {
        axios.get("http://localhost:3001/recipes")
            .then(response => {
                const recipes = response.data;
                dispatch(get_all_recipes(recipes));
            })
            .catch(error => {
                console.log(error);
            });
    }
}