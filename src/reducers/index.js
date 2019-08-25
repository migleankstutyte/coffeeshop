import { combineReducers } from 'redux';
import allCoffeeItems from './coffeeReducer';

export default combineReducers({
    allCoffeeItems: allCoffeeItems,
});