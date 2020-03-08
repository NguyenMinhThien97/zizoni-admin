import * as Types from './../constants/ActionTypes';

var initialState = {};

const orderEditing = (state = initialState, action) => {
    switch(action.type){
        case Types.EDIT_ORDER:
            return action.order;
        default:
            return state;
    }
}

export default orderEditing;
