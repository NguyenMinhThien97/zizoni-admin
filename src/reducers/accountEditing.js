import * as Types from './../constants/ActionTypes';

var initialState = {};

const accountEditing = (state = initialState, action) => {
    switch(action.type){
        case Types.EDIT_ACCOUNT:
            return action.account;
        default:
            return state;
    }
}

export default accountEditing;
