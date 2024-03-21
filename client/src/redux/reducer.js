import { LOGIN, GET_USERS, ADD_EXPENSE_INCOME, GET_CATEGORIES_EXPENSE, GET_CATEGORIES_INCOME, GET_ACTIONS, CLEAN_USER, LOGIN_FAILED } from './action-types';

const initialState = {
    users: {},
    user: {},
    expenses: [],
    categorieExpense: [],
    categorieIncome: [],
    actions: [],
    loginError: ''
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:
            return {
                ...state, user: action.payload, loginError: '' // Limpiar el mensaje de error cuando el inicio de sesión sea exitoso
            }
        case GET_USERS:
            return {
                ...state, users: action.payload
            }
        case ADD_EXPENSE_INCOME:
            return {
                ...state,
                expenses: [...state.expenses, action.payload]
            }

        case GET_CATEGORIES_EXPENSE: 
            return {
                ...state,
                categorieExpense: action.payload
            };

        case GET_CATEGORIES_INCOME: 
            return {
                ...state,
                categorieIncome: action.payload
            };
        case GET_ACTIONS:
            return {
                ...state,
                actions: action.payload
            };
        case CLEAN_USER:
            return {
                ...state, user: action.payload

            }
        case LOGIN_FAILED:
            return {
                ...state, loginError: action.payload
            }
        default:
            return {
                ...state
            };
    }
};

export default rootReducer;