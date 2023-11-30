import { R } from "../../Utils/actions";
import STOCK_CONSTANT from "../../Constants/Types/stocks.types";

export const fetchStockData = () => ({
	type: STOCK_CONSTANT.FETCH_STOCKS,
});

export const resetStockData = () => ({
	type: R(STOCK_CONSTANT.FETCH_STOCKS),
});
