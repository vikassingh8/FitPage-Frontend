import { all, fork } from "redux-saga/effects";
import { fetchStocksWatcher } from "./stocks.saga";

export default function* rootSaga() {
	yield all([fork(fetchStocksWatcher)]);
}
