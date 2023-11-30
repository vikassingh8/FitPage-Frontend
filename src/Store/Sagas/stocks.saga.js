import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { F, S } from "../../Utils/actions";
import STOCK_CONSTANT from "../../Constants/Types/stocks.types";

import { baseURL } from "../baseUrl";

const STOCK_URL = "/data";

function fetchStocksDataAPI() {
	return axios.request({
		baseURL,
		responseType: "json",
		url: `${STOCK_URL}`,
		method: "GET",
	});
}

export function* fetchStocksDataAPIWorker(action) {
	try {
		const { data } = yield call(fetchStocksDataAPI, action?.payload);
		if (data) {
			yield put({
				type: S(action.type),
				payload: data,
			});
		} else {
			yield put({ type: F(action.type), error: data?.message });
		}
	} catch (e) {
		yield put({ type: F(action.type), error: e?.message });
	}
}

export function* fetchStocksWatcher() {
	yield takeEvery(STOCK_CONSTANT.FETCH_STOCKS, fetchStocksDataAPIWorker);
}

export default fetchStocksWatcher;
