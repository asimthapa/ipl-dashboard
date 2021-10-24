import { React } from "react";

export const MatchSmallCard = ({ match }) => {
	console.log(match);
	return (
		<div className="MatchSmallCard">
			<p>
				{match.team1} vs {match.team2}
			</p>
		</div>
	);
};
