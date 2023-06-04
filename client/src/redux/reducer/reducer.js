import {
    GET_ALL_RECIPES,
    GET_ALL_DIETS,
    POST_RECIPE
} from "../actions/actions";

const initialState = {
    allRecipes: [],
    allDiets: []
};

const rootReducer = (state = initialState, {
    type,
    payload
}) => {
    switch (type) {
        case GET_ALL_RECIPES:
            return {
                ...state,
                allRecipes: payload,
            };
        case GET_ALL_DIETS:
            return {
                ...state,
                allDiets: payload,
            };
        case POST_RECIPE:
            return {
                ...state,
                allRecipes: [...state.allRecipes, payload]
            }
            default:
                return state;
    }
};

export default rootReducer;