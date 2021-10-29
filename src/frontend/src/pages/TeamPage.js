import { React, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MatchDetailCard } from "../components/MatchDetailCard";
import { MatchSmallCard } from "../components/MatchSmallCard";
import { WinLossPieChart } from "../components/WinLossPieChart";
import "./TeamPage.scss";

export const TeamPage = () => {
	const [team, setTeam] = useState({ recentMatches: [] });
	const { teamName } = useParams();
	useEffect(() => {
		const fetchMatches = async () => {
			const response = await fetch(`http://localhost:8080/team/${teamName}`);
			const data = await response.json();
			setTeam(data);
		};
		fetchMatches();
	}, [teamName]);

	if (!team || !team.teamName) {
		return <h1>Team not found</h1>;
	}

	return (
		<div className="TeamPage">
			<div className="team-name">
				<h1 className="team-name">{team.teamName}</h1>
			</div>
			<div className="win-loss">
				Wins / Losses
				<WinLossPieChart
					wins={team.totalWins}
					losses={team.totalMatches - team.totalWins}
				/>
			</div>
			<div className="match-detail">
				<h3>Latest Matches</h3>
				<MatchDetailCard
					teamName={team.teamName}
					match={team.recentMatches[0]}
				/>
			</div>
			{team.recentMatches.slice(1).map((match) => (
				<MatchSmallCard teamName={team.teamName} match={match} key={match.id} />
			))}
			<div className="more-link">
				<Link
					to={`/teams/${teamName}/matches/${process.env.REACT_APP_DATA_END_YEAR}`}
				>
					More {">>"}
				</Link>
			</div>
		</div>
	);
};
