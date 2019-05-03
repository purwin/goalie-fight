const fs = require('fs');

// FUTURE: Import CSV funcs
const csv = require('./csv');

const a = [
	{
		id: 1,
		name: "one",
		team: "phi",
		stat: 3
	},
	{
		id: 2,
		name: "two",
		team: "col",
		stat: 2
	},
	{
		id: 3,
		name: "three",
		team: "win",
		stat: 1
	},
	{
		id: 4,
		name: "four",
		team: "ala",
		stat: 90
	},
];

const b = [
	{
		id: 1,
		name: "one",
		team: "phi",
		stat: 2
	},
	{
		id: 5,
		name: "five",
		team: "lan",
		stat: 37
	},
	{
		id: 3,
		name: "three",
		team: "bos",
		stat: 4
	},
	{
		id: 4,
		name: "four",
		team: "ala",
		stat: 1
	},
];

const c = a.concat(b);

// Function to concatenate arrays of goalie stats
// and combine raw numbers
const combineStats = arr => {

	// Combine objects in array that have matching ID, name, team trifecta
	const x = arr.reduce((total, line) => {
		// Skip any combined stats
		if (line.team === 'ALL') {
			return total
		}
		// Create array of all unique ID/Name/Team objects in array argument
		total['goalieList'] = total['goalieList'] || [];

		// Create array of stats for unique objects in array argument
		total['goalies'] = total['goalies'] || [];

		// Check if current ID/Name/Team object is stored in goalieList
		let check = total['goalieList'].filter(item => (
					item.id == line.id && item.name === line.name && item.team === line.team
		))[0];

		// If trifecta is new, iterate over array arg and accumulate stats
		if (!check) {

			let temp = {
				id: line.id,
				name: line.name,
				team: line.team,
				gp: 0,
				toi: 0,
				sa: 0,
				saves: 0,
				sv: 0,
				gsaa: ,
				gsaa60: 0,
				xga: 0,
				hdsa: 0,
				hdsaves: 0,
				hdsv: 0,
				hdgsaa: 0,
				hdgsaa60: 0,
				xsv: 0,
				dsv: 0
			};

			arr.forEach(item => {
				if (item.id == line.id && item.name == line.name && item.team == line.team) {
					temp.stat = temp.stat + item.stat;
					temp.gp = temp.gp + item.gp
					temp.toi = temp.toi + item.toi
					temp.sa = temp.sa + item.sa
					temp.saves = temp.saves + item.saves
					// Calculate SV%
					temp.sv = csv.calc_SV(temp.saves, temp.sa)
					temp.gsaa = temp.gsaa + item.gsaa
					// Calculate per-60 rates
					temp.gsaa60 = exports.calc_PER60(temp.gsaa, temp.toi)
					temp.xga = temp.xga + item.xga
					temp.hdsa = temp.hdsa + item.hdsa
					temp.hdsaves = temp.hdsaves + item.hdsaves
					temp.hdsv = temp.hdsv + item.hdsv
					temp.hdgsaa = temp.hdgsaa + item.hdgsaa
					// Calculate per-60 rates
					temp.hdgsaa60 = exports.calc_PER60(temp.hdgsaa, temp.toi)
					// Calculate xSV%
					temp.xsv = csv.calc_SV((temp.sa - temp.xga), temp.sa)
					// Calculate dSV%
					temp.dsv = temp.sv - temp.xsv
				}
			});

			console.log(temp);
			total['goalies'].push(temp)
			total['goalieList'].push({
				id: temp.id,
				name: temp.name,
				team: temp.team
			})
		}

		return total
	}, {})

	return x
};


// Function to combine stats for goalies on multiple teams
// and add an 'ALL' goalie option to the goalieList
const combineSplits = ({goalieList, goalies}) => {
	let totalList = [];
	let dupeList = [];

	// Create array of IDs for goalies on multiple teams
	goalieList.forEach(item => {
		// Loop over goalie list
		if (totalList.includes(item.id)) {
			// Store duplicate IDs
			dupeList.push(item.id)
		}

		totalList.push(item.id)
	})

	// Loop over stats, combine for duplicates, create an ALL object
	const newObj = dupeList.reduce((total, line) => {
		total.goalieList = total.goalieList || [];
		total.goalies = total.goalies || [];
		let allGoalie = {
			id: line,
			team: 'ALL',
			stat: 0
		};

		// Loop over stats, combine if ID === goalie.id
		goalies.forEach(goalie => {
			if (goalie.id === line) {
				// Set name to goalie name
				allGoalie.name = goalie.name
				// Combine stats
				allGoalie.stat += goalie.stat
			}

		})

		// Add line to new goalieList array
		total.goalieList.push({
			id: allGoalie.id,
			name: allGoalie.name,
			team: allGoalie.team
		})

		// Add line to new goalies array
		total.goalies.push(allGoalie)

		return total
	}, {})

	// Return concatenated arrays w/ 'ALL' stats as an object
	return {
		goalieList: goalieList.concat(newObj.goalieList),
		goalies: goalies.concat(newObj.goalies),
	}
};


const yearArr = [`2009`, `2010`, `2011`, `2012`, `2013`, `2014`, `2015`, `2016`, `2017`, `2018`, ];

const combineYears = yearArr => {
	const situations = [ `all`, `5v5`, `evens`, `pk`, `4v5`, ];

	// FUTURE: wrap below reduce in a forEach function, iterating over situations

	// Loop through years, combine and write files for each year span
	yearArr.reduce((total, year) => {

		// Define input file
		const inputFile = `../../data/JSON/${`5v5`}/stats_${year}_${`5v5`}.json`;

		// Read input file
		const inputData = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

		// If only calculating one year, don't write to file, just return data
		if (year === yearArr[0]) {
			return inputData
		}

		// Add previous years' data to current year
		const data = total.concat(inputData);

		console.log(data.length)

		// Call combineStats function
		// const tempData = combineStats(data);

		// Call combineSplits function
		// const newData = combineSplits(newData);

		// Define output filename
		let outputFile = `../../data/JSON/${`5v5`}/stats_${yearArr[0] === year ? year : `${yearArr[0]}-${year}`}_${`5v5`}.json`;

		// Write newData to file
		// fs.writeFile(outputFile, JSON.stringify(newData, null, 2), err => {
		// 	if (err) throw err;
		// 	console.log(err);
		// });

		// Return compiled data as total
		return newData

	}, []);


};
