import {SET_LEADS_SUCCESS, GET_LEADS_SUCCESS} from '../constants/ActionTypes';

const initialState = []

export default function leads(state=initialState, action) {
    switch(action.type) {
    case GET_LEADS_SUCCESS:
        if(action.data === undefined) {
            return [];
        }
        return [...action.data.leads];
    default:
        return state;
    }
}

//export default leadsReducers;
