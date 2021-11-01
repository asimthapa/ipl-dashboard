import { React, useEffect, useState } from "react";
import { useParams } from "react-router";
import { MatchDetailCard } from "../components/MatchDetailCard";
import { ResourceNotFound } from "../components/ResourceNotFound";
import { YearSelector } from "../components/YearSelector";
import "./MatchPage.scss";

export const MatchPage = () => {
	const [matches, setMatches] = useState([]);
	const [loadState, setLoadState] = useState({
		loading: true,
	});
	const { teamName, year } = useParams();
	useEffect(() => {
		if (isNaN(year)) {
			return;
		}
		const fetchMatches = async () => {
			const response = await fetch(
				`${process.env.REACT_APP_API_ROOT_URL}/team/${teamName}/matches?year=${year}`
			);
			const data = await response.json();
			setMatches(data);
			setLoadState({
				loading: false,
			});
		};
		fetchMatches();
	}, [teamName, year]);

	//TODO: fix attempt to returning matches for teams that don't exist
	if (isNaN(year)) {
		return <ResourceNotFound customMessage="Invalid date" />;
	}

	if (loadState.loading) {
		//TODO: implement loading
		return null;
	}

	return (
		<div className="MatchPage">
			<div></div>
			<h1 className="page-title">
				{teamName} matches in {year}
			</h1>
			<div className="year-selector">
				<h3 className="year-selector-title">Select Year</h3>
				<YearSelector teamName={teamName} />
			</div>
			<div className="match-list">
				{matches.map((match) => (
					<MatchDetailCard key={match.id} teamName={teamName} match={match} />
				))}
			</div>
		</div>
	);
};
