import { React, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MatchDetailCard } from "../components/MatchDetailCard";
import { MatchSmallCard } from "../components/MatchSmallCard";
import { WinLossPieChart } from "../components/WinLossPieChart";
import { ResourceNotFound } from "../components/ResourceNotFound";
import "./TeamPage.scss";

export const TeamPage = () => {
	const [team, setTeam] = useState({ recentMatches: [] });
	const [loadState, setLoadState] = useState({
		loading: true,
		teamFound: false,
	});
	const { teamName } = useParams();
	useEffect(() => {
		const fetchMatches = async () => {
			const response = await fetch(`http://localhost:8080/team/${teamName}`);
			if (response.headers.get("Content-Length") !== "0") {
				const data = await response.json();
				setTeam(data);
				setLoadState({
					loading: false,
					teamFound: true,
				});
			} else {
				setLoadState({
					loading: false,
					teamFound: false,
				});
			}
		};
		fetchMatches();
	}, [teamName]);

	if (loadState.loading) {
		//TODO: implement loading
		return null;
	}

	if (!loadState.teamFound) {
		return <ResourceNotFound resourceName="Team" />;
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
