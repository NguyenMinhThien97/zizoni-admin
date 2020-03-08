import * as Types from '../constants/ActionTypes';

var initialState = {};

const perPage = (state = initialState, action) => {
    switch(action.type){
        case Types.PER_PAGE:
            return action.perPage;
        default: 
            return state;
    }
}

export default perPage;
