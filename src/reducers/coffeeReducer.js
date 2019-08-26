import * as actionTypes from "../actions/actionTypes";

export default (state = JSON.parse(localStorage.getItem('localStorageData')), action) => {
    switch (action.type) {
        case actionTypes.CREATE_NEW_COFFEE:
            return [
                ...state,
                Object.assign({}, action.newCoffeeItem),
            ];
        case actionTypes.REMOVE_COFFEE:
            return state.filter((data, i) => i !== action.id)

        case actionTypes.FETCH_COFFEE:
            return JSON.parse(localStorage.getItem('localStorageData'));
        default:
            return state;
    }
};