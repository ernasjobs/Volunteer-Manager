import axios from 'axios';
export const GET_ALL_USERS_REQUEST = 'GET_ALL_USERS_REQUEST';
export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';
export const GET_ALL_USERS_ERROR = 'GET_ALL_USERS_ERROR';
const getUsersSuccess = payload => ({
    type: GET_ALL_USERS_SUCCESS,
    payload,
});

const getUsersError = payload => ({
    type: GET_ALL_USERS_ERROR,
    payload,
});

export const  getAllUsers = (status) => dispatch => {
    dispatch({ type: GET_ALL_USERS_REQUEST })
    return axios.get('api/Users/GetUsers/'+status).then(res => {
        const response = res.data;
        dispatch(getUsersSuccess(response))
    }).catch(error => {
        dispatch(getUsersError('Something went wrong'));
        return Promise.reject({});
    })
}
export default getAllUsers;