import axios from 'axios';

const initialState = {
    user: {},
    isLoggedIn: false
}

const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const GET_USER = 'GET_USER';
const REGISTER_USER = 'REGISTER_USER';

export function loginUser(user){
    return {
        type: LOGIN_USER,
        payload: user
    }
}



export default function(state = initialState, action){
    switch(action.type){
        case LOGIN_USER:
            return {...state, user: action.payload, isLoggedIn: true}
    }
}