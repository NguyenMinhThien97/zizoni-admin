import * as Types from './../constants/ActionTypes';
var initialState = [];

var findIndex = (orders, id) => {
    var result = -1;
    orders.forEach((order, index) => {
        if (order.id === id) {
            result = index;
        }
    });
    return result;
}

const order = (state = initialState, action) => {
    var index = -1;
    var { id, order } = action;
    switch (action.type) {
        case Types.FETCH_ORDER:
            state = action.order;
            return [...state];
        case Types.DELETE_ORDER:
            index = findIndex(state, id);
            state.splice(index, 1);
            return [...state];
        case Types.ADD_ORDER:
            state.push(action.order);
            return [...state];
        case Types.UPDATE_ORDER:
            index = findIndex(state, order.id);
            state[index] = order;
            return [...state];
        default: return [...state];
    }
};

export default order;