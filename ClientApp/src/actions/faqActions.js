import axios from 'axios';
export const GET_ALL_FAQS_REQUEST = 'GET_ALL_FAQS_REQUEST';
export const GET_ALL_FAQS_SUCCESS = 'GET_ALL_FAQS_SUCCESS';
export const GET_ALL_FAQS_ERROR = 'GET_ALL_FAQS_ERROR';
const getFaqsSuccess = payload => ({
    type: GET_ALL_FAQS_SUCCESS,
    payload,
});

const getFaqsError = payload => ({
    type: GET_ALL_FAQS_ERROR,
    payload,
});

export const  getAllFaqs = () => dispatch => {
    dispatch({ type: GET_ALL_FAQS_REQUEST })
    return axios.get('api/Faqs/GetFaqs').then(res => {
        const response = res.data;
        dispatch(getFaqsSuccess(response))
    }).catch(error => {
        dispatch(getFaqsError('Something went wrong'));
        return Promise.reject({});
    })
}
export default getAllFaqs;