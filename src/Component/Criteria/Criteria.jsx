import React from "react";
import styles from "./Criteria.module.scss";
import { useLocation, Link } from "react-router-dom";

const Criteria = (props) => {
	// location and destructuring stock properties
	const location = useLocation();
	const { stock } = location.state || {};
	const { name, color, tag, criteria } = stock;

	// Function to render variable text
	const renderVariableText = (text, variable) => {
		const words = text.split(/\s+/); // Split text into words
		return (
			<div className={styles.element}>
				{words.map((word) => {
					if (word.startsWith("$")) {
						// Check for $ sign if the word starts with and set the values from the array or object
						const key = word;
						if (variable[key]) {
							const variableValue =
								variable[key]?.default_value ??
								variable[key]?.values[0] ??
								"";
							return (
								<Link
									to={`/`}
									className={styles.link}
									key={key}
									state={{
										detailObject: variable[key],
									}}
								>
									({variableValue})
								</Link>
							);
						} else {
							return (
								<React.Fragment key={word}>
									{word}
								</React.Fragment>
							);
						}
					} else {
						return (
							<React.Fragment key={word}> {word} </React.Fragment>
						);
					}
				})}
			</div>
		);
	};
	return (
		<>
			{stock && (
				<ol className={styles.list}>
					<div className={styles.header}>
						<div className={styles.text}>{name}</div>
						<div
							className={styles.subText}
							style={{ color: color }}
						>
							{tag}
						</div>
					</div>
					<div className={styles.criteria}>
						{criteria.map((element, index) => {
							return (
								<div
									key={element.text}
									data-testid="criteria-element"
								>
									{index > 0 ? (
										<div className={styles.and}>and</div>
									) : null}
									<div className={styles.element}>
										{element?.variable
											? renderVariableText(
													element.text,
													element.variable
											  )
											: element.text}
									</div>
								</div>
							);
						})}
					</div>
				</ol>
			)}
		</>
	);
};

export default Criteria;
