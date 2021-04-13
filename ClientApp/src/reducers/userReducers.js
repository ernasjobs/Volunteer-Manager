import {
    GET_ALL_USERS_REQUEST,
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_ERROR
} from  '../actions/userActions';

const INITIAL_STATE = {
    loading: false,
    hasError: false,
    error: null,
    data: []
}

export default (state = INITIAL_STATE, action) =>  {
    switch(action.type){
        case GET_ALL_USERS_REQUEST: 
        return {
        ...state, 
        loading:true};
        case GET_ALL_USERS_SUCCESS: 
        return {
            ...state,
            loading:false,
            hasError: false,
            data: action.payload
        };
        case GET_ALL_USERS_ERROR : 
        return {
            ...state,
            loading:false,
            hasError: true,
            error: action.payload
        };
        default: 
        return state;
    }
}