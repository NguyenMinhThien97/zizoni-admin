import * as Types from './../constants/ActionTypes';
var initialState = [];

var findIndex = (colors, id) => {
    var result = -1;
    colors.forEach((color, index) => {
        if (color.id === id) {
            result = index;
        }
    });
    return result;
}

const color = (state = initialState, action) => {
    var index = -1;
    var { id, color } = action;
    switch (action.type) {
        case Types.GET_COLOR:
            state = action.color;
            return [...state];
        case Types.DELETE_COLOR:
            index = findIndex(state, id);
            state.splice(index, 1);
            return [...state];
        case Types.ADD_COLOR:
            state.push(action.color);
            return [...state];
        case Types.UPDATE_COLOR:
            index = findIndex(state, color.id);
            state[index] = color;
            return [...state];
        default: return [...state];
    }
};

export default color;