const fs = require('fs');

const goalieJSON = '../../data/stats_2018_5v5-03.json';
const file = '../../data/goalie_ids.json';

// Get goalie name as arg
// Read goalie_id.json
// check for name in json
// Return id if found
// If no id found, get max id #
// Add new name, id to goalie_id.json


// Function to get id value
const getID = (name, arr) => {
	// Search array for name, get ID value
	const match = arr.filter(item => item.name === name)[0];
	console.log(match)
	// If name not in array, return false
	return match.id ? match.id : false;
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
	// write newGoalie to file
	fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8')
};


const returnID = (obj, idData) => {
	let id = getID(obj.name, idData);

	if (!id) {
		// Get new ID
		id = newID(idData);
	
		// Concat new goalie to JSON
		const newJSON = newGoalie({
			id: id,
			name: obj.name
		}, idData)
	
		// Add updated JSON file
		addGoalie(file, newJSON)
	}

	return(id);
}



// Read goalie_id.json file
try {
	// Get goalie ID list
  const data = JSON.parse(fs.readFileSync(goalieJSON, 'utf8'));
	const idData = JSON.parse(fs.readFileSync(file, 'utf8'));

	data.forEach(item => {
		// returnID(item, idData)
		console.log(item)
	})

	let id = getID(data[0].name, idData);

	returnID(data[0]);

	if (!id) {
		// Get new ID
		id = newID(idData);

		// Concat new goalie to JSON
		const newJSON = newGoalie({
			id: id,
			name: data[0].name
		}, idData)

		// Add updated JSON file
		addGoalie(file, newJSON)
	}
	console.log(id);
	return id;

} catch (err) {
  console.error(err);
}

// try {
// 	fs.writeFileSync(writeFile, JSON.stringify(data, null, 2));
// } catch (err) {
// 	console.log(err);
// }