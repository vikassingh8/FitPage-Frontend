import styles from "./App.module.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StockList from "./Component/StockList/StockList";
import Criteria from "./Component/Criteria/Criteria";

const App = () => {
	return (
		<div className={styles.container}>
			<div className={styles.section}>
				<BrowserRouter>
					<Routes>
						<Route path="/" exact element={<StockList />} />
						{/* Render StockList on home route */}
						<Route path="/criteria" element={<Criteria />} />
						{/* Render Criteria component on /criteria route */}
					</Routes>
				</BrowserRouter>
			</div>
		</div>
	);
};

export default App;
