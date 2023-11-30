import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Criteria from "./Criteria";

// Mock the useLocation hook
jest.mock("react-router-dom", () => {
	return {
		...jest.requireActual("react-router-dom"),
		useLocation: () => {
			return {
				pathname: "/Criteria",
				search: "",
				hash: "",
				state: null,
				key: "default",
			};
		},
	};
});
describe("Criteria Component", () => {
	test("renders criteria correctly when stock object is provided", () => {
		const mockStock = {
			name: "Stock A",
			color: "blue",
			tag: "Tag A",
			criteria: [
				{
                    type:"plain_text",
					text: "This is a $1 criteria.",
					variable: {
						$1: {
							study_type: "type_A",
							parameter_name: "parameter_A",
							default_value: 20,
						},
					},
				},
				{
					text: "This is a static criteria.",
				},
			],
		};

		jest.spyOn(require("react-router-dom"), "useLocation").mockReturnValue({
			state: {
				stock: mockStock,
			},
		});
		render(
			<MemoryRouter>
				<Criteria />
			</MemoryRouter>
		);

		const stockName = screen.getByText("Stock A");
		const criteriaElements = screen.getAllByTestId("criteria-element");
		expect(stockName).toBeInTheDocument();
		expect(criteriaElements).toHaveLength(2);
		expect(criteriaElements[0]).toHaveTextContent("This is a (20)");
		expect(criteriaElements[1]).toHaveTextContent(
			"This is a static criteria."
		);
	});

	test("renders criteria without variable links", () => {
		const mockStock = {
			name: "Stock B",
			color: "green",
			tag: "Tag B",
			criteria: [
				{
					text: "This is a static criteria.",
				},
			],
		};

		jest.spyOn(require("react-router-dom"), "useLocation").mockReturnValue({
			state: {
				stock: mockStock,
			},
		});
		render(
			<MemoryRouter>
				<Criteria />
			</MemoryRouter>
		);

		const stockName = screen.getByText("Stock B");
		const criteriaElements = screen.getAllByTestId("criteria-element");
		expect(stockName).toBeInTheDocument();
		expect(criteriaElements).toHaveLength(1);
		expect(criteriaElements[0]).toHaveTextContent(
			"This is a static criteria."
		);
	});
});
