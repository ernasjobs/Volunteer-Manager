import {combineReducers} from 'redux';
import userReducers from './userReducers';
import eventReducers from './eventReducers';
import volunteerEventReducers from './volunteerEventReducers';
import eventDetailsReducers from './eventDetailsReducers';
import faqReducers from './faqReducers';
const rootReducer = combineReducers(
    {
        users: userReducers,
        events: eventReducers, 
        volunteerevents: volunteerEventReducers,
        eventDetails: eventDetailsReducers,
        faqs: faqReducers
    }
);

export default rootReducer;