import * as Types from './../constants/ActionTypes';
var initialState = [];

var findIndex = (accounts, id) => {
    var result = -1;
    accounts.forEach((account, index) => {
        if (account.id === id) {
            result = index;
        }
    });
    return result;
}

const accounts = (state = initialState, action) => {
    var index = -1;
    var { id, account } = action;
    switch (action.type) {
        case Types.GET_ACCOUNT:
            state = action.account;
            return [...state];
        case Types.DELETE_ACCOUNT:
            index = findIndex(state, id);
            state.splice(index, 1);
            return [...state];
        case Types.ADD_ACCOUNT:
            state.push(action.account);
            return [...state];
        case Types.UPDATE_ACCOUNT:
            index = findIndex(state, account.id);
            state[index] = account;
            return [...state];
        default: return [...state];
    }
};

export default accounts;