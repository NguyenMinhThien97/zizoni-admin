import * as Types from './../constants/ActionTypes';
var initialState = [];

var findIndex = (sizes, id) => {
    var result = -1;
    sizes.forEach((size, index) => {
        if (size.id === id) {
            result = index;
        }
    });
    return result;
}

const size = (state = initialState, action) => {
    var index = -1;
    var { id, size } = action;
    switch (action.type) {
        case Types.GET_SIZE:
            state = action.size;
            return [...state];
        case Types.DELETE_SIZE:
            index = findIndex(state, id);
            state.splice(index, 1);
            return [...state];
        case Types.ADD_SIZE:
            state.push(action.size);
            return [...state];
        case Types.UPDATE_SIZE:
            index = findIndex(state, size.id);
            state[index] = size;
            return [...state];
        default: return [...state];
    }
};

export default size;