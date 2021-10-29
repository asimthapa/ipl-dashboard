import { React, useEffect, useState } from "react";
import { useParams } from "react-router";
import { MatchDetailCard } from "../components/MatchDetailCard";
import { YearSelector } from "../components/YearSelector";
import "./MatchPage.scss";

export const MatchPage = () => {
	const [matches, setMatches] = useState([]);
	const { teamName, year } = useParams();
	useEffect(() => {
		const fetchMatches = async () => {
			const response = await fetch(
				`http://localhost:8080/team/${teamName}/matches?year=${year}`
			);
			const data = await response.json();
			setMatches(data);
		};
		fetchMatches();
	}, [teamName, year]);

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
