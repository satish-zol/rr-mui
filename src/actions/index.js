import * as types from '../constants/ActionTypes';

export const getLeads = (query) => {
    return dispatch => {
        return fetch('http://localhost:4000/api/v1/leads')
            .then(
							  response => response.json(),
                error => console.log('An error occured', error)
            )
            .then(json => dispatch({type: types.GET_LEADS_SUCCESS, data: json}))
    }
}


