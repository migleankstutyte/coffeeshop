import * as actionTypes from "../actions/actionTypes";

export default (state = [
    {
        "image": "https://qph.fs.quoracdn.net/main-qimg-dd7cf1a3dc4e495334f698e8d37ba555",
        "title": "Black coffee",
        "price": "1.50",
        "capacity": "200"
    },
    {
        "image": "https://rawfactoryflavor.com/wp-content/uploads/2015/11/latte.jpg",
        "title": "Latte",
        "price": "2.30",
        "capacity": "200"
    },
    {
        "image": "https://upload.wikimedia.org/wikipedia/commons/d/d8/Blue_Bottle%2C_Kyoto_Style_Ice_Coffee_%285909775445%29.jpg",
        "title": "Iced coffee",
        "price": "2.60",
        "capacity": "200"
    },
    {
        "image": "https://www.smuckersrms.com/PhotoImage.ashx?photoid=9774&w=600&h=600&mark=1",
        "title": "Mocha",
        "price": "2.50",
        "capacity": "200"
    },
], action) => {
    switch (action.type) {
        case actionTypes.CREATE_NEW_COFFEE:
            return [
                ...state,
                Object.assign({}, action.newCoffeeItem),
            ];
        case actionTypes.REMOVE_COFFEE:
            return state.filter((data, i) => i !== action.id)
        default:
            return state;
    }
};