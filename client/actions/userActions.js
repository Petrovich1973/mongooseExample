import axios from "axios";
import { apiPrefix } from '../../etc/config.json';
import Promise from 'promise-polyfill'
if(!window.Promise) {
    window.Promise = Promise;
}

export function fetchUsers(params) {
    return function (dispatch, getState) {
        let state = getState();
        // let filter = () => Object.keys(state.users.filter).filter(f => state.users.filter[f].length).length;
        dispatch({ type: "FETCH_USERS", payload: true });
        axios.get(`${apiPrefix}/api/users/${params.params.page}`, {...params, params: {
                ...params.params, 
                filter: state.users.filter
            }})
            .then((response) => {
                dispatch({ type: "UPDATE_USERS", payload: response.data.users.length ? response.data : {
                    ...response.data, 
                    msg: 'Результат не найден',
                    success: false
                } });
            })
            .catch((err) => {
                dispatch({ type: "FETCH_USERS_REJECTED", payload: err });
            });
    };
}

export function addUser(user) {
    return function (dispatch, getState) {
        let state = getState();
        let params = {
            params: {
                page: state.users.page,
                perPage: state.users.perPage
            }
        }
        dispatch({ type: "FETCH_USERS", payload: true });
        axios.post(`${apiPrefix}/api/users`, user)
            .then((response) => {                
                dispatch( fetchUsers(params) );
                dispatch({ type: "NOTIFY_USERS", payload: response.data });
                return null;
            })
            .catch((err) => {
                dispatch({ type: "FETCH_USERS_REJECTED", payload: err });
            });
    };
}

export function editUserSend(user) {
    return function (dispatch) {
        dispatch({ type: "FETCH_USERS", payload: true });
        dispatch({ type: "EDIT_USER_CANCEL" });
        axios.put(`${apiPrefix}/api/users/${user.id}`, user)
            .then((response) => {
                dispatch({ type: "EDIT_USER_SAVE", payload: user });
                dispatch({ type: "NOTIFY_USERS", payload: response.data });
            })
            .catch((err) => {
                dispatch({ type: "FETCH_USERS_REJECTED", payload: err });
            });
    };
}

export function deleteUser(userId) {
    return function (dispatch, getState) {
        let state = getState();
        let params = {
            params: {
                page: state.users.page,
                perPage: state.users.perPage
            }
        }
        dispatch({ type: "FETCH_USERS", payload: true });
        axios.delete(`${apiPrefix}/api/users/${userId}`)
            .then((response) => {
                if(response.data.success) {                    
                    dispatch( fetchUsers(params) );
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

export function filterChangeElement(field) {
    return {
        type: 'FILTER_FIELD',
        payload: field
    };
}

export function filterReset() {
    return {
        type: 'FILTER_RESET'
    };
}

export function changeFieldFormSettingsTable(field) {
    return {
        type: 'SETTINGS_FIELD',
        payload: field
    };
}

export function changeField(field) {
    return {
        type: 'CHANGE_FIELD',
        payload: field
    };
}

export function editModeUser(user) {
    return {
        type: 'EDIT_MODE_USER',
        payload: user
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

// Actions