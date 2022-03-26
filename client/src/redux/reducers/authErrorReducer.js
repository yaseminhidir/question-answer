import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState'

export default function authReducer(state=initialState.error,action){
    switch (action.type) {
        case actionTypes.AUTH_ERROR:
            return action.payload
            
        default:
           return state;
    }
 }