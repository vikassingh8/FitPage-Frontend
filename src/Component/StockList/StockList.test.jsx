import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import StockList from "./StockList";

// Mock the useLocation hook
jest.mock("react-router-dom", () => {
	return {
		...jest.requireActual("react-router-dom"),
		useLocation: () => {
			return {
				pathname: "/",
				search: "",
				hash: "",
				state: null,
				key: "default",
			};
		},
	};
});

describe("StockList Component", () => {
	const mockStore = configureMockStore();

	test("renders loading spinner when isLoading is true", () => {
		const store = mockStore({
			stocks: {
				data: [],
				isLoading: true,
			},
		});

		render(
			<Provider store={store}>
				<MemoryRouter>
					<StockList />
				</MemoryRouter>
			</Provider>
		);

		const spinnerElement = screen.getByTestId("spinner");
		expect(spinnerElement).toBeInTheDocument();
	});
	test("renders sorted values when detailObject is provided", () => {
		const mockDetailObject = {
			values: [3, 1, -2, 4],
		};
		const mockStocksData = [
			{ id: 1, name: "Stock A", color: "blue", tag: "Tag A" },
			{ id: 2, name: "Stock B", color: "green", tag: "Tag B" },
		];

		const store = mockStore({
			stocks: {
				data: mockStocksData,
				isLoading: false,
			},
		});

		// Mock useLocation to return the mockDetailObject only for this test case
		jest.spyOn(require("react-router-dom"), "useLocation").mockReturnValue({
			state: {
				detailObject: mockDetailObject,
			},
		});

		render(
			<Provider store={store}>
				<MemoryRouter>
					<StockList />
				</MemoryRouter>
			</Provider>
		);

		const sortedValues = screen.queryAllByTestId("values-test");
		expect(sortedValues).toHaveLength(4);
		expect(sortedValues[0]).toHaveTextContent("-2");
		expect(sortedValues[3]).toHaveTextContent("4");
	});

	test("renders default value section when detailObject is provided", () => {
		const mockDetailObject = {
			study_type: "some_type",
			parameter_name: "some_parameter",
			default_value: 10,
		};
		const mockStocksData = [
			{ id: 1, name: "Stock A", color: "blue", tag: "Tag A" },
			{ id: 2, name: "Stock B", color: "green", tag: "Tag B" },
		];

		const store = mockStore({
			stocks: {
				data: mockStocksData,
				isLoading: false,
			},
		});

		// Mock useLocation to return the mockDetailObject only for this test case
		jest.spyOn(require("react-router-dom"), "useLocation").mockReturnValue({
			state: {
				detailObject: mockDetailObject,
			},
		});

		render(
			<Provider store={store}>
				<MemoryRouter>
					<StockList />
				</MemoryRouter>
			</Provider>
		);

		const defaultValueSection = screen.queryByTestId(
			"default-value-section"
		);
		expect(defaultValueSection).toBeInTheDocument();
	});

	test("renders stocks list when detailObject is not provided", () => {
		const mockStocksData = [
			{ id: 1, name: "Stock A", color: "blue", tag: "Tag A" },
			{ id: 2, name: "Stock B", color: "green", tag: "Tag B" },
		];

		const store = mockStore({
			stocks: {
				data: mockStocksData,
				isLoading: false,
			},
		});

		// Mock useLocation to return the mockDetailObject only for this test case
		jest.spyOn(require("react-router-dom"), "useLocation").mockReturnValue({
			state: {},
		});
		render(
			<Provider store={store}>
				<MemoryRouter>
					<StockList />
				</MemoryRouter>
			</Provider>
		);
		const stockListItems = screen.queryAllByTestId("stock-list-item");
		expect(stockListItems).toHaveLength(2);
		expect(stockListItems[0]).toHaveTextContent("Stock A");
		expect(stockListItems[1]).toHaveTextContent("Tag B");
	});
});
