import * as actionTypes from './actionTypes';

export const createNewCoffeeItem = (newCoffeeItem) => {
    return {
        type: actionTypes.CREATE_NEW_COFFEE,
        newCoffeeItem: newCoffeeItem
    }
};

export const deleteCoffeeItem = (id) => {
    return {
        type: actionTypes.REMOVE_COFFEE,
        id: id
    }
}