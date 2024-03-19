import { LOGIN } from './action-types';

const initialState = {
    user: {},
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:
            return {
                ...state, user: action.payload
            }
        default:
            return {
                ...state
            };
    }
};

export default rootReducer;