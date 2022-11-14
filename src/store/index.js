import { combineReducers, createStore } from "redux";
import authReducer from "./reducers/auth"
import bookingReducer from "./reducers/booking";



const store = createStore(combineReducers({
    auth : authReducer,
    booking : bookingReducer
}));

export default store;