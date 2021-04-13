import axios from 'axios';
export const GET_ALL_EVENTS_REQUEST = 'GET_ALL_EVENTS_REQUEST';
export const GET_ALL_EVENTS_SUCCESS = 'GET_ALL_EVENTS_SUCCESS';
export const GET_ALL_EVENTS_ERROR = 'GET_ALL_EVENTS_ERROR';
const getEventsSuccess = payload => ({
    type: GET_ALL_EVENTS_SUCCESS,
    payload,
});

const getEventsError = payload => ({
    type: GET_ALL_EVENTS_ERROR,
    payload,
});

export const  getAllEvents = (status) => dispatch => {
    dispatch({ type: GET_ALL_EVENTS_REQUEST })
    return axios.get('api/Events/GetEvents/'+status).then(res => {
        const response = res.data;
        dispatch(getEventsSuccess(response))
    }).catch(error => {
        dispatch(getEventsError('Something went wrong'));
        return Promise.reject({});
    })
}
export default getAllEvents;