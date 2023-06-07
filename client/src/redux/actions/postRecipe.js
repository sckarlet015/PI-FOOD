import axios from "axios";
import {
    post_recipe
} from "./actions";

export default function postRecipe(recipe) {
    return dispatch => {
        axios.post("http://localhost:3001/recipes", recipe)
            .then(response => response.data)
            .then(data => {
                dispatch(post_recipe(data))
                alert(`Receta ${data.name} creada con éxito.`);
            })
            .catch(error => {
                alert(error.response.data.message);
            })
    }
}