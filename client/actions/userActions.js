import axios from "axios";
import { apiPrefix } from '../../etc/config.json';
import Promise from 'promise-polyfill'
if(!window.Promise) {
    window.Promise = Promise;
}

export function fetchUsers() {
    return function (dispatch) {
        dispatch({ type: "FETCH_USERS", payload: true });
        axios.get(`${apiPrefix}/api/users`)
            .then((response) => {
                dispatch({ type: "UPDATE_USERS", payload: response.data });
            })
            .catch((err) => {
                dispatch({ type: "FETCH_USERS_REJECTED", payload: err });
            });
    };
}

export function addUser(user) {
    return function (dispatch) {
        dispatch({ type: "FETCH_USERS", payload: true });
        axios.post(`${apiPrefix}/api/users`, user)
            .then((response) => {
                dispatch({ type: "ADD_USER", payload: response.data });
            })
            .catch((err) => {
                dispatch({ type: "FETCH_USERS_REJECTED", payload: err });
            });
    };
}

export function deleteUser(userId) {
    return function (dispatch) {
        dispatch({ type: "FETCH_USERS", payload: true });
        axios.delete(`${apiPrefix}/api/users/${userId}`)
            .then((response) => {
                if(response.data.success) {                    
                    dispatch( fetchUsers() );
                    dispatch({ type: "NOTIFY_USERS", payload: response.data });
                    return null;
                } else {
                    dispatch({ type: "FETCH_USERS", payload: false });
                    dispatch({ type: "NOTIFY_USERS", payload: response.data });
                }                
            })
            .catch((err) => {
                dispatch({ type: "FETCH_USERS_REJECTED", payload: err });
            });
    };
}

export function editModeUser(user) {
    return {
        type: 'EDIT_MODE_USER',
        payload: user
    };
}

export function editUserSend(user) {
    return function (dispatch) {
        dispatch({ type: "FETCH_USERS", payload: true });
        axios.put(`${apiPrefix}/api/users/${user.id}`, user)
            .then((response) => {
                dispatch({ type: "EDIT_USER_SAVE", payload: user });
            })
            .catch((err) => {
                dispatch({ type: "FETCH_USERS_REJECTED", payload: err });
            });
    };
}

export function editUserCancel() {
    return {
        type: 'EDIT_USER_CANCEL'
    };
}

export function clearMsgUsers() {
    return {
        type: 'NOTIFY_USERS',
        payload: {msg: null, success: true}
    };
}