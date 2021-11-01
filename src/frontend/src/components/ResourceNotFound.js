import { React } from "react";

export const ResourceNotFound = ({ resourceName, moreText, customMessage }) => {
	if (resourceName == null) {
		resourceName = "Resource";
	}

	if (customMessage) {
		return <h1>{customMessage}</h1>;
	}
	return (
		<h1>
			{resourceName} not found {moreText}
		</h1>
	);
};
