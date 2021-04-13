import axios from 'axios';
export const GET_ALL_EVENT_DETAILS_REQUEST = 'GET_ALL_EVENT_DETAILS_REQUEST';
export const GET_ALL_EVENT_DETAILS_SUCCESS = 'GET_ALL_EVENT_DETAILS_SUCCESS';
export const GET_ALL_EVENT_DETAILS_ERROR = 'GET_ALL_EVENT_DETAILS_ERROR';
const getEventsSuccess = payload => ({
    type:  GET_ALL_EVENT_DETAILS_SUCCESS,
    payload,
});

const getEventsError = payload => ({
    type: GET_ALL_EVENT_DETAILS_ERROR,
    payload,
});

export const  getAllEventDetails = (id) => dispatch => {
    dispatch({ type: GET_ALL_EVENT_DETAILS_REQUEST })
    return axios.get('api/Events/ShowEventDetails/'+id).then(res => {
        const response = res.data;
        console.log(response);
        dispatch(getEventsSuccess(response))
    }).catch(error => {
        dispatch(getEventsError('Something went wrong'));
        return Promise.reject({});
    })
}
export default getAllEventDetails;