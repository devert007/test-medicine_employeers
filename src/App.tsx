import Header from "./Header";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Doctors from "./Doctors";
import Nursers from "./Nursers";

function App() {
	return (
		<Router>
			<Header />
			<main>
				<Routes>
					<Route path="/doctors" element={<Doctors />} />
					<Route path="/nurses" element={<Nursers />} />
				</Routes>
			</main>
		</Router>
	);
}

export default App;
