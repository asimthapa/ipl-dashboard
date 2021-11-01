import "./App.scss";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { TeamPage } from "./pages/TeamPage";
import { MatchPage } from "./pages/MatchPage";
import { HomePage } from "./pages/HomePage";
import { ResourceNotFound } from "./components/ResourceNotFound";

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/">
						<HomePage />
					</Route>
					<Route exact path="/teams/:teamName">
						<TeamPage />
					</Route>
					<Route exact path="/teams/:teamName/matches/:year">
						<MatchPage />
					</Route>
					<Route path="*">
						<ResourceNotFound />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
