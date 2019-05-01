const fs = require('fs');

const goalieJSON = '../../data/stats_2018_5v5-03.json';
const file = '../../data/goalie_ids.json';

// Get goalie name as arg
// Read goalie_id.json
// check for name in json
// Return id if found
// If no id found, get max id #
// Add new name, id to goalie_id.json


// Function to find ID value of name arg in array arg
const findID = (name, arr) => {
	// Search array for name, get ID value
	const match = arr.filter(item => item.name === name)[0];
	console.log(match)
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


const newGoalie = (obj, arr) => {
	const goalie = {
		id: newID(arr),
		...obj
	};
	// Create new goalie object w/ name, id vals
	return arr.concat(goalie);
};


// Function to write new goalie to json file
const addGoalie = (file, data) => {
	// write JSON with new goalie to file
	try {
		fs.writeFileSync(file, JSON.stringify(data, null, 2));
	} catch (err) {
		console.log(err);
	}
};


const returnID = name => {
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
		addGoalie(file, newJSON)
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
		returnID(item.name, idData)
		// console.log(item)
	})

} catch (err) {
  console.error(err);
}


// module.exports = {

// };

// exports.returnID = name => {}