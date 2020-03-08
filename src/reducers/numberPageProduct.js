import * as Types from '../constants/ActionTypes';

var initialState = {};

const numberPageProduct = (state = initialState, action) => {
    switch(action.type){
        case Types.FETCH_NUMBER_PAGE_PRODUCTS:
            return action.numberPageProduct;
        default: 
            return state;
    }
}

export default numberPageProduct;
