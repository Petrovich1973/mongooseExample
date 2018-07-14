const initialState = {    
    users: [/*{
        id: 0, 
        name: 'Vasya', 
        age: 23, 
        gender: 'male'
    },{
        id: 1, 
        name: 'Elena', 
        age: 45, 
        gender: 'female'
    },{
        id: 2, 
        name: 'Nikolay', 
        age: 12, 
        gender: 'male'
    }*/],
    msg: null,
    success: true,
    editMode: false,
    waiting: false
};

export default function reducer(state = initialState, action) {

    switch (action.type) {
        case "FETCH_USERS": {
            return {
                ...state,
                waiting: action.payload
            };
        }
        case "FETCH_USERS_REJECTED": {
            alert(action.payload);
            return {
                ...state,
                waiting: false
            };
        }
        case "UPDATE_USERS": {
            return {
                ...state,
                users: action.payload,
                waiting: false
            };
        }
        case "ADD_USER": {
            return {
                ...state,
                users: state.users.concat([action.payload]),
                waiting: false
            };
        }
        case "DELETE_USER": {
            return {
                ...state,
                users: state.users.filter(f => f.id !== action.payload),
                waiting: false
            };
        }
        case "EDIT_MODE_USER": {
            return {
                ...state,
                editUser: action.payload,
                editMode: action.payload.id
            };
        }
        case "EDIT_USER_SAVE": {
            return {
                ...state,
                users: state.users.map(user => {
                    if(user.id === action.payload.id) {
                        return {...action.payload}
                    } else {
                         return {...user}
                    }
                }),
                editMode: false,
                waiting: false
            };
        }
        case "EDIT_USER_CANCEL": {
            return {
                ...state,
                editMode: false
            };
        }
        case "NOTIFY_USERS": {
            return {
                ...state,
                msg: action.payload.msg,
                success: action.payload.success
            };
        }
    }

    return state;
}