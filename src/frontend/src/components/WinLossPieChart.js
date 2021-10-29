import { React } from "react";
import { PieChart } from "react-minimal-pie-chart";

export const WinLossPieChart = ({ wins, losses }) => {
	const data = [
		{ title: "Losses", value: Number(losses), color: "#b25959" },
		{ title: "Wins", value: Number(wins), color: "#087560" },
	];
	return <PieChart data={data} animate={true} />;
};
