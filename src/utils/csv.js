const csv = require('csvtojson')
const fs = require('fs')

const goalie_id = require('./goalie_id')


// File path of CSV file to read
const csvFilePath = '../../data/CSV/PK/stats_2018_PK.csv'


// Function that calculates save percentage
// Receives 2 arguments: saves and shots (numbers as string or int)
// Returns a decimal int
exports.calc_SV = (saves, shots) => decimalThree(parseFloat(saves) / parseFloat(shots));

// Function that calculates dSV% (SV% - xSV%)
// Receives 2 arguments: SV% and xSV% (numbers as string or int)
// Returns an int
exports.calc_DSV = (sv, xsv) => decimalThree((parseFloat(sv) * 100) - (parseFloat(xsv) * 100));


// Function that calculates per-60 stats
// Receives 2 arguments: a value and time in mins (numbers as string or int)
// Returns an int
exports.calc_PER60 = (val, mins) => decimalThree((parseFloat(val) / parseFloat(mins)) * 60);


// Function that reformats time from a decimaled number to a time format
// Takes a decimal number and returns a string as minutes:seconds
const calc_toi = toi => `${parseInt(toi)}:${parseInt((toi - parseInt(toi)) * 60)}`;


// Function that calculates percentile of a given number
// Receives a number and an array as arguments
// Returns percentile as number
const percentile = (num, arr) => {
	// Get array of values < given number
	const position = arr.filter(item => item < num);

	// Get count of numbers with same rank as given num
	const duplicates = arr.filter( item => item === num);

	// Calculate percentile
	return (position.length + (.5 * duplicates.length)) / arr.length * 100
};


// Function that calculates ranking of a given number
// Receives a number and an array as arguments
// Returns number
const rank = (num, arr) => (
   // If num is null/NaN, return null
   // Otherwise return sorted index val
   Number.isNaN(Number(num)) ? null : arr.sort((a, b) => b - a).indexOf(num) + 1
);


// Function that generates a number with 3 decimal places
// Receives a number as an argument, returns a number
const decimalThree = num => Number(num.toFixed(3));


// Function that calculates percentile and rank values for items in array of objects
exports.calcRankPercentile = arr => {

	// Create an object of arrays of each stat category to generate rank and percentiles for each goalie stat
	const compiledArrays = arr.reduce((total, {id, name, team, ...stats}) => {
      // Loop through stats, add to each key array
		Object.keys(stats).forEach(key => {
			total[key] = total[key] || []
			total[key].push(stats[key])
		});
      
		return total
	}, {});

	// Loop through argument array, compile stats and percentiles
	const output = arr.reduce((total, goalie)=> {
		const {name, team, id, ...stats} = goalie;

		let tempObj = {
			id,
			name,
			team,
			percentile: {},
			rank: {},
			stats: {},
		};

      // Loop through each stat, populate new keys 
		Object.keys(stats).forEach(stat => {
         // Calculate percentile for each stat
         tempObj.percentile[stat] = percentile(goalie[stat], compiledArrays[stat])
         // Calculate rank for each stat
         tempObj.rank[stat] = rank(goalie[stat], compiledArrays[stat])
         // Add each stat to stats obj
			tempObj.stats[stat] = goalie[stat]
		});

		total.push(tempObj)

		return total
	}, []);

	return output
};


// Function to combine stats for goalies on multiple teams
// and add an 'ALL' goalie option to the goalieList
const combineGoalies = arr => {
   let tempArr = [];
   let duplicates = [];

   // Loop through array, store duplicate goalie IDs
   arr.forEach(goalie => {
      // Loop over array
      if (tempArr.includes(goalie.id) && !duplicates.includes(goalie.id)) {
         // Store duplicate IDs
         duplicates.push(goalie.id)
      }

      tempArr.push(goalie.id)
   })

   // Loop over stats, combine for duplicates, create an ALL object
   const newObj = duplicates.reduce((total, line) => {

      let allGoalie = {
         id: line,
         team: 'ALL',
         gp: 0,
         toi: 0,
         sa: 0,
         saves: 0,
         gsaa: 0,
         xga: 0,
         hdsa: 0,
         hdsaves: 0,
         hdgsaa: 0,
      };

      // Loop over stats, combine if ID === goalie.id
      arr.forEach(goalie => {
         if (goalie.id === line) {
            // Set name to goalie name
            allGoalie['name'] = goalie.name
            // Combine stats
            allGoalie['gp'] += goalie['gp']
            allGoalie['toi'] += goalie['toi']
            allGoalie['sa'] += goalie['sa']
            allGoalie['saves'] += goalie['saves']
            allGoalie['gsaa'] += goalie['gsaa']
            allGoalie['xga'] += goalie['xga']
            allGoalie['hdsa'] += goalie['hdsa']
            allGoalie['hdsaves'] += goalie['hdsaves']
            allGoalie['hdgsaa'] += goalie['hdgsaa']
         }

      })

      // Add line to new goalies array
      total.push(allGoalie)

      return total
   }, [])

   // Return concatenated argument and new array
   return arr.concat(newObj)
};


// Function that calculates SV%, per-60 stats in given array arg
// Takes an array of goalie objects
// Returns an array with additional keys
const statCalculations = arr => (
   arr.map(goalie => (
      {
         sv: exports.calc_SV(goalie.saves, goalie.sa),
         hdsv: exports.calc_SV(goalie.hdsaves, goalie.hdsa),
         xsv: exports.calc_SV((goalie.sa - goalie.xga), goalie.sa),
         dsv: exports.calc_DSV(
            exports.calc_SV(goalie.saves, goalie.sa),
            exports.calc_SV(
               (goalie.sa - goalie.xga),
               goalie.sa
            )
         ),
         gsaa60: exports.calc_PER60(goalie.gsaa, goalie.toi),
         hdgsaa60: exports.calc_PER60(goalie.hdgsaa, goalie.toi),
         ...goalie
      }
   ))
);


const getGoalieData = obj => (
	obj.map(goalie => (
		// Return goalie object
		{
			// Pull ID value from goalie_id.json
			id: goalie_id.returnID(goalie.Player),
			name: goalie.Player,
			team: goalie.Team.toUpperCase().replace(/[^A-Z]/, ''),
			gp: parseFloat(goalie['GP']),
			toi: parseFloat(goalie['TOI']),
			sa: parseFloat(goalie['Shots Against']),
			saves: parseFloat(goalie['Saves']),
			gsaa: parseFloat(goalie['GSAA']),
			xga: parseFloat(goalie['xG Against']),
			hdsa: parseFloat(goalie['HD Shots Against']),
			hdsaves: parseFloat(goalie['HD Saves']),
			hdgsaa: parseFloat(goalie['HDGSAA']),
		}
	))
);


// Read CSV file, then generate an array of goalie stat data and write to JSON
csv()
	.fromFile(csvFilePath)
	.then(jsonObj => {
		// Pull stats needed, get ID, store as array
      const goalieData = getGoalieData(jsonObj);
      
      // Go through array, combine team stats into new array
      const combinedData = combineGoalies(goalieData);
      
      // Go through array, Calculate SV%, per-60 stats
      const statsData = statCalculations(combinedData);
      
      // FUTURE: Compile multiple year stats
      
      // Go through array, calculate percentile and rank values
      const newData = exports.calcRankPercentile(statsData)

      fs.writeFile('../../data/JSON/PK/stats_2018_PK.json', JSON.stringify(newData, null, 2), err => {
         if (err) throw err;
         console.log(err);
      });

	})