import React, { useEffect, useState } from "react";
import styles from "./StockList.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchStockData } from "../../Store/Actions/stocks.action";
import Spinner from "../shared/Loader/Loader";
import { Link, useLocation } from "react-router-dom";
const StockList = ({ ...props }) => {
	// State management
	const [stocksData, setStocksData] = useState([]);
	const stocksDataSelector = useSelector((state) => state.stocks);
	const [isLoading, setIsLoading] = useState(true);
	const [inputValue, setInputValue] = useState("");
	// Handle change event for input
	const handleInputChange = (event, min, max) => {
		if (event.target.value >= max) {
			setInputValue(max);
		} else if (event.target.value <= min) {
			setInputValue(min);
		} else {
			setInputValue(event.target.value);
		}
	};

	// Location and dispatch
	const location = useLocation();
	const { detailObject } = location.state || {};
	const dispatch = useDispatch();

	// Fetch stock data on component mount
	useEffect(() => {
		dispatch(fetchStockData());
	}, [dispatch]);

	// Update stocksData when stocksDataSelector changes and set the stock data
	useEffect(() => {
		const { data, isLoading } = stocksDataSelector;
		if (isLoading) {
			setIsLoading(true);
		} else if (!isLoading && data && data?.length > 0) {
			setIsLoading(false);
			setStocksData(data);
		}
	}, [stocksDataSelector]);

	return (
		<React.Fragment>
			{isLoading ? (
				<Spinner />
			) : (
				<>
					{/* Render sorted values */}
					{detailObject?.values && (
						<ol className={styles.list}>
							{detailObject.values
								.sort((a, b) => {
									if (a < 0 && b < 0) return b - a; // For negative values, largest to smallest
									return a - b; // For non-negative values, smallest to largest
								})
								.map((element) => {
									return (
										<div
											className={styles.listItem}
											key={element}
											data-testid={"values-test"}
										>
											<div className={styles.listText}>
												{element}
											</div>
										</div>
									);
								})}
						</ol>
					)}

					{/* Render default_value section */}
					{detailObject?.default_value && (
						<div
							className={styles.parameterSection}
							data-testid="default-value-section"
						>
							<div className={styles.header}>
								{detailObject.study_type.toUpperCase()}
							</div>
							<div className={styles.parameterText}>
								Set Parameters
							</div>
							<div className={styles.variableSection}>
								<div className={styles.parameter}>
									{detailObject.parameter_name
										.charAt(0)
										.toUpperCase() +
										detailObject.parameter_name.slice(1)}
								</div>
								<input
									className={styles.inputValue}
									value={
										inputValue === ""
											? detailObject.default_value
											: inputValue
									}
									type="text"
									onChange={(e) =>
										handleInputChange(
											e,
											detailObject.min_value,
											detailObject.max_value
										)
									}
								/>
							</div>
						</div>
					)}
					{/* Render stocks list */}
					{!detailObject && (
						<ol className={styles.list}>
							{stocksData.map((stock) => {
								return (
									<Link
										key={stock?.id}
										className={styles.link}
										to={"/criteria"}
										state={{ stock }}
										data-testid="stock-list-item"
									>
										<div className={styles.listItem}>
											<div className={styles.text}>
												{stock.name}
											</div>
											<div
												className={styles.subText}
												style={{ color: stock?.color }}
											>
												{stock.tag}
											</div>
										</div>
									</Link>
								);
							})}
						</ol>
					)}
				</>
			)}
		</React.Fragment>
	);
};

export default StockList;
