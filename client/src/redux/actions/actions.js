export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_ALL_DIETS = "GET_ALL_DIETS";
export const POST_RECIPE = "POST_RECIPE"

export function get_all_recipes(payload) {
    return {
        type: GET_ALL_RECIPES,
        payload: payload
    }
};
export function get_all_diets(payload) {
    return {
        type: GET_ALL_DIETS,
        payload: payload
    }
}
export function post_recipe(payload) {
    return {
        type: POST_RECIPE,
        payload: payload
    }
}