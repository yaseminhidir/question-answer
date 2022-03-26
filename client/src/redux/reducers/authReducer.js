
import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState'

export default function authReducer(state=initialState.user,action){
   switch (action.type) {
       case actionTypes.AUTH_SUCCESS:
           return action.payload  
       default:
          return state;
   }
}