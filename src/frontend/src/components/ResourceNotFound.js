import { React } from "react";

export const ResourceNotFound = ({ resourceName, moreText }) => {
	if (resourceName == null) {
		resourceName = "Resource";
	}

	return (
		<h1>
			{resourceName} not found {moreText}
		</h1>
	);
};
