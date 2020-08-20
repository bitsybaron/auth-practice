import axios from 'axios';

const initialState = {
    user: {},
    isLoggedIn: false,
    posts: []
}

const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const GET_USER = 'GET_USER';
const GET_MY_POSTS = 'GET_MY_POSTS';


export function loginUser(user){
    return {
        type: LOGIN_USER,
        payload: user
    }
}

export function getUser(){
    const user = axios.get('/auth/user')
    return {
        type: GET_USER,
        payload: user
    }
}

export function logoutUser() {
    return {
        type: LOGOUT_USER,
        payload: initialState
    }
}

export function getPosts(posts) {
    return {
        type: GET_MY_POSTS,
        payload: posts
    }
}



export default function(state = initialState, action){
    switch(action.type){
        case LOGIN_USER:
            return {...state, user: action.payload, isLoggedIn: true}
        case GET_USER + "_FULFILLED":
            return {...state, user: action.payload.data, isLoggedIn: true}
        case LOGOUT_USER:
            return {...state, ...action.payload}
        case GET_MY_POSTS:
            return {...state, posts: action.payload}
        default:
            return initialState;

    }
}