import { React, useEffect, useState } from "react";
import { MatchDetailCard } from "../components/MatchDetailCard";
import { MatchSmallCard } from "../components/MatchSmallCard";

export const TeamPage = () => {
	const [team, setTeam] = useState({ recentMatches: [] });
	useEffect(() => {
		const fetchMatches = async () => {
			const response = await fetch(
				"http://localhost:8080/team/Chennai%20Super%20Kings"
			);
			const data = await response.json();
			setTeam(data);
		};
		fetchMatches();
	}, []);

	return (
		<div className="TeamPage">
			<h1>{team.teamName}</h1>
			<MatchDetailCard match={team.recentMatches[0]} />
			{team.recentMatches.slice(1).map((match) => (
				<MatchSmallCard match={match} />
			))}
		</div>
	);
};
