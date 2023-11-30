import { combineReducers } from "redux";
import stockReducer from "./stocks.reducer";

export default combineReducers({ stocks: stockReducer });
