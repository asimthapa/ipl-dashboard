import { React, useEffect, useState } from "react";
import { TeamTile } from "../components/TeamTile";
import "./HomePage.scss";

export const HomePage = () => {
	const [teams, setTeams] = useState([]);
	const [loadState, setLoadState] = useState({
		loading: true,
	});
	const startYear = process.env.REACT_APP_DATA_START_YEAR;
	const endYear = process.env.REACT_APP_DATA_END_YEAR;
	useEffect(() => {
		const fetchAllTeams = async () => {
			const response = await fetch(
				`${process.env.REACT_APP_API_ROOT_URL}/team`
			);
			const data = await response.json();
			setTeams(data);
			setLoadState({
				loading: false,
			});
		};
		fetchAllTeams();
	}, []);

	if (loadState.loading) {
		//TODO: implement loading
		return null;
	}

	return (
		<div className="HomePage">
			<div className="header-section">
				<h1 className="app-title">
					IPL Dashboard ({startYear} - {endYear})
				</h1>
			</div>
			<div className="team-grid">
				{teams.map((team) => (
					<TeamTile
						key={team.id}
						teamName={team.teamName}
						totalMatches={team.totalMatches}
						wins={team.totalWins}
					/>
				))}
			</div>
		</div>
	);
};
