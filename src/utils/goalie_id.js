const fs = require('fs');

const goalieJSON = '../../data/JSON/5v5/stats_2018_5v5.json';
const file = '../../data/goalie_ids.json';


// Function to find ID value of name arg in array arg
const findID = (name, arr) => {
	// Search array for name, get ID value
	const match = arr.filter(item => item.name === name)[0];
	// If name not in array, return false
	return match ? match.id : false;
};


// Function to set new id value
const newID = arr => {
	// Search for max id value in array
	const max = arr.reduce((max, item) => (item.id > max ? item.id : max), 0);
	// Return max value + 1
	return max + 1;
};


// Function to create a new goalie object w/ ID and add to array of objects
const newGoalie = (obj, arr) => {
	const goalie = {
		id: newID(arr),
		...obj
	};
	// Create new goalie object w/ name, id vals
	return arr.concat(goalie);
};


// Function to write new goalie to json file
const writeData = (file, data) => {
	// write JSON with new goalie to file
	try {
		fs.writeFileSync(file, JSON.stringify(data, null, 2));
	} catch (err) {
		console.log(err);
	}
};


// Function that receives a goalie name as string arg
// Checks goalie_id.json for goalie ID
// If found, returns ID
// If no ID found, get max ID #
// Add new name, ID to goalie_id.json
// Then returns new goalie ID
exports.returnID = name => {
	const goalieIDs = JSON.parse(fs.readFileSync(file, 'utf8'));
	let id = findID(name, goalieIDs);

	// If ID not found, create new ID and add new goalie to JSON file
	if (!id) {
		console.log(`ID not found`);

		// Get new ID
		id = newID(goalieIDs);
		console.log(`NEW ID: ${id}`);

		// Append new goalie to goalie ID JSON
		const newJSON = newGoalie(
			{
				id: id,
				name: name
			},
			goalieIDs
		)

		// Write updated JSON to file
		writeData(file, newJSON)
	}

	// Return ID val
	return(id);
};



// Read goalie_id.json file
try {
	// Get goalie ID list
	const data = JSON.parse(fs.readFileSync(goalieJSON, 'utf8'));
	const idData = JSON.parse(fs.readFileSync(file, 'utf8'));

	data.forEach(item => {
		exports.returnID(item.name, idData)
	})

} catch (err) {
	console.error(err);
}
