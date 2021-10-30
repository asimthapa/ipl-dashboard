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
		const fetchMatches = async () => {
			const response = await fetch(
				`http://localhost:8080/team/${teamName}/matches?year=${year}`
			);
			const data = await response.json();
			setMatches(data);
			setLoadState({
				loading: false,
			});
		};
		fetchMatches();
	}, [teamName, year]);

	if (loadState.loading) {
		//TODO: implement loading
		return null;
	}

	if (matches.length === 0) {
		return (
			<ResourceNotFound resourceName="Matches" moreText={`for ${teamName}`} />
		);
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
