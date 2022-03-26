import {combineReducers} from "redux"

import authReducer from "./authReducer"
import authErrorReducer from "./authErrorReducer"

const rootReducer=combineReducers({
    authReducer,
    authErrorReducer
})
export default rootReducer;