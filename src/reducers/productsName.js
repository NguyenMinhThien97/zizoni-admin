import * as Types from '../constants/ActionTypes';

var initialState = {};

const productsName = (state = initialState, action) => {
    switch(action.type){
        case Types.GET_PRODUCTS_NAME:
            return action.productsName;
        default: 
            return state;
    }
}

export default productsName;