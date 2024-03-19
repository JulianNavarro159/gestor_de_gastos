import { LOGIN } from './action-types';
import { GET_USERS, ADD_EXPENSE_INCOME, GET_CATEGORIES_EXPENSE, GET_CATEGORIES_INCOME} from './action-types';
import axios from 'axios';

const baseURL = 'http://localhost:3001/auth';

export const login = (credentials) => {                                         
    return async function(dispatch) {                                           
        const user = (await axios.post(`${baseURL}/login`, credentials)).data;        //Aquí(.data) estaría la info que nos interesa para la sesión del usuario
        console.log(user);
        //const token = `Bearer ${user.tokenUser}`;
        dispatch({ type: LOGIN, payload: user });
    }
};

export const getUsers = () => {
    return async function(dispatch) {
        const users = (await axios.get('http://localhost:3001/auth/users')).data;
        dispatch({ type: GET_USERS, payload: users});
    }
};

export const addExpenseIncome = (payload) => {
    return async (dispatch) => {
        try {
            const apiData = await axios.post("http://localhost:3001/actions", payload)
            const expense = apiData.data

            alert("Exito")

            return dispatch({
                type: ADD_EXPENSE_INCOME,
                payload: expense,

            })

        } catch (error) {

            alert("Ocurre un error")
            throw error;
        }
    }
}

export const getCategoryExpense = () => {
    return async function(dispatch) {
        try {
            const categories = (await axios.get('http://localhost:3001/categoryBills')).data;
            dispatch({
                 type: GET_CATEGORIES_EXPENSE,
                  payload: categories 
                });
        } catch (error) {
            alert("Ocurrió un error al obtener las categorías");
            throw error;
        }
    }
};

export const getCategoryIncome = () => {
    return async function(dispatch) {
        try {
            const categories = (await axios.get('http://localhost:3001/categoryIncome')).data;
            dispatch({
                 type: GET_CATEGORIES_INCOME,
                  payload: categories 
                });
        } catch (error) {
            alert("Ocurrió un error al obtener las categorías");
            throw error;
        }
    }
};