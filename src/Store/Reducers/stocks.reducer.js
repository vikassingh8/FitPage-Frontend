import { S, F, R } from "../../Utils/actions";
import STOCK_CONSTANT from "../../Constants/Types/stocks.types";

const INITIAL_STATE = {
	data: null,
	error: null,
	isLoading: false,
};

const stockReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case STOCK_CONSTANT.FETCH_STOCKS:
			return {
				...state,
				isLoading: true,
			};
		case S(STOCK_CONSTANT.FETCH_STOCKS):
			return {
				...state,
				data: action.payload,
				isLoading: false,
				error: null,
			};
		case F(STOCK_CONSTANT.FETCH_STOCKS):
			return {
				...state,
				isLoading: false,
				error: action.error,
			};

		case R(STOCK_CONSTANT.FETCH_STOCKS):
			return {
				...INITIAL_STATE,
			};
		default:
			return state;
	}
};

export default stockReducer;
