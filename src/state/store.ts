import userReducer from "./userReducer"
import messageReducer from './messageReducer'
import { createStore, applyMiddleware  } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from "redux"
const rootReducer = combineReducers({ user: userReducer, message: messageReducer })
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()))

export default store
export type RootState = ReturnType<typeof store.getState>