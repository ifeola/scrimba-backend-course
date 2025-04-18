import express from "express";
import startups from "./data.js";

let app = express();
const PORT = 3000;

// Get a product by id
app.get("/api/startups/:id", (request, response) => {
	const {
		params: { id },
	} = request;

	const parsedId = parseInt(id);
	if (isNaN(parsedId)) {
		console.log("You've just entered an invalid ID");
		return response.status(400).send("You've just entered an invalid ID");
	}

	const startup = startups.find((value) => parsedId === value.id);
	if (!startup) {
		console.log("Data not found");
		return response.status(400).send("Data not found");
	}
	return response.send(startup);
});

// Get data by indusrty
/* app.get("/api/startup/:industry", (request, response) => {
	const {
		params: { industry },
	} = request;

	if (!industry) {
		console.log("You've just entered an invalid industry");
		return response.status(400).send("You've just entered an invalid industry");
	}

	const data = startups.filter(
		(value) => value.industry.toLowerCase() === industry
	);

	if (!data) {
		console.log("Data not found");
		return response.status(400).send("Data not found");
	}

	return response.json(data);
}); */
app.get("/api/startups/:field/:term", (req, res) => {
	const { field, term } = req.params;

	const allowedFields = ["country", "continent", "industry"];

	/*
Challenge:
1. If the client’s 'field' is not supported, serve this object:
  {message: "Search field not allowed. Please use only 'country', 'continent', 'industry'" }
2. Chain in the .status(<code>) method to set a status code.
	What status code should you set?
3. You might run into an error! Find a solution!

hint.md for help!
*/

	if (!allowedFields.includes(field))
		return res.status(400).json({
			message:
				"Search field not allowed. Please use only 'country', 'continent', 'industry'",
		});

	// const filteredData = startups.filter((startup) => {
	// 	return term.toLowerCase() === startup[field].toLowerCase();
	// });
	if (filteredData.length === 0)
		return res.json({ message: "Nothing to see here" });
	return res.json(filteredData);
});

// Query parameters
app.get("/api/startups", (request, response) => {
	/*
Challenge:
1. When a user hits the /api endpoint with query params, filter the data so 
we only serve objects that meet their requirements. 
     
The user can filter by the following properties:
  industry, country, continent, is_seeking_funding, has_mvp

Test Cases

/api?industry=renewable%20energy&country=germany&has_mvp=true
  Should get the "GreenGrid Energy" object.

/api?industry=renewable%20energy&country=germany&has_mvp=false
  Should not get any object

/api?continent=asia&is_seeking_funding=true&has_mvp=true
  should get for objects with IDs 3, 22, 26, 29
*/

	const {
		query: { industry, continent, country, is_seeking_funding, has_mvp },
	} = request;

	let filteredData = startups;
	if (industry) {
		filteredData = filteredData.filter((startup) => {
			return startup.industry.toLowerCase() === industry.toLowerCase();
		});
	}
	if (continent) {
		filteredData = filteredData.filter((startup) => {
			return startup.continent.toLowerCase() === continent.toLowerCase();
		});
	}
	if (country) {
		filteredData = filteredData.filter((startup) => {
			return startup.country.toLowerCase() === country.toLowerCase();
		});
	}
	if (is_seeking_funding) {
		filteredData = filteredData.filter((startup) => {
			return (
				startup.is_seeking_funding ===
				JSON.parse(is_seeking_funding.toLowerCase())
			);
		});
	}
	if (has_mvp) {
		filteredData = filteredData.filter((startup) => {
			return startup.has_mvp === JSON.parse(has_mvp.toLowerCase());
		});
	}

	return response.json(filteredData);
});

/* app.get("/api/startups/:id", (request, response) => {
	const {
		params: { id },
	} = request;

	// Input Validation: Check if ID is a valid number format BEFORE parsing
	// (Optional but good practice, especially if IDs aren't purely numeric)
	// if (!/^\d+$/.test(id)) {
	//     return response.status(400).json({ message: "Invalid ID format. ID must be a positive integer." });
	// }

	const parsedId = parseInt(id, 10); // Always provide radix for parseInt

	// Check if parsing resulted in NaN (e.g., ID was "abc" or potentially too large)
	if (isNaN(parsedId)) {
		console.error(`Invalid ID received: ${id}`); // Log error on server
		// Send 400 Bad Request to the client
		return response
			.status(400)
			.json({ message: "Invalid ID format. ID must be an integer." });
	}

	// Assuming 'startups' is an array available in this scope
	if (!Array.isArray(startups)) {
		console.error(
			"Server Error: 'startups' data is not available or not an array."
		);
		// return response.status(500).json({ message: "Internal Server Error" });
	}

	const startup = startups.startups.find((value) => value.id === parsedId); // Use strict equality

	if (!startup) {
		console.log(`Startup with ID ${parsedId} not found.`); // Log info on server
		// Send 404 Not Found to the client
		return response
			.status(404)
			.json({ message: `Startup with ID ${parsedId} not found.` });
	}

	// Success: Send the found startup data with 200 OK (default status)
	response.json(startup); // Use response.json for sending JSON data
}); */

app.get("/", (request, response) => {
	response.send(startups);
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
