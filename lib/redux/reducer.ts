import { combineReducers } from "@reduxjs/toolkit";
import launchReducer from "./slices/launchDataSlice"

const rootReducer=combineReducers({
    launch:launchReducer,
})

export default rootReducer