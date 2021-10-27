import { React, useEffect, useState } from "react";
import { useParams } from "react-router";
import { MatchDetailCard } from "../components/MatchDetailCard";

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
			console.log(matches);
		};
		fetchMatches();
	}, []);

	return (
		<div className="MatchPage">
			<h1> MATCH PAGE</h1>
			{matches.map((match) => (
				<MatchDetailCard key={match.id} teamName={teamName} match={match} />
			))}
		</div>
	);
};
