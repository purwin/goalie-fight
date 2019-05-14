const csv = require('csvtojson')
const fs = require('fs')

const goalie_id = require('./goalie_id')


// File path of CSV file to read
const csvFilePath = '../../data/CSV/5v5/stats_2018_5v5.csv'


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


// Read CSV file, then generate an array of goalie stat data and write to JSON
csv()
	.fromFile(csvFilePath)
	.then(jsonObj => {
		// Define array values for calculating rank and percentiles
		let gpArray = [];
		let toiArray = [];
		let saArray = [];
		let savesArray = [];
		let svArray = [];
		let gsaaArray = [];
		let gsaa60Array = [];
		let xgaArray = [];
		let hdsaArray = [];
		let hdsavesArray = [];
		let hdsvArray = [];
		let hdgsaaArray = [];
		let hdgsaa60Array = [];
		let xsvArray = [];
		let dsvArray = [];
		let goalieData = [];

		// Loop through CSV rows, store data
      jsonObj.map(goalie => {
         // Add values to arrays for calculating percentile, rank
         gpArray.push(parseFloat(goalie.GP))
         toiArray.push(parseFloat(goalie.TOI))
         saArray.push(parseFloat(goalie['Shots Against']))
         savesArray.push(parseFloat(goalie.Saves))
         svArray.push(parseFloat(goalie['SV%']))
         gsaaArray.push(parseFloat(goalie.GSAA))
         // Calculate per-60 rate from gsaa
         gsaa60Array.push(exports.calc_PER60(goalie.GSAA, goalie.TOI))
         xgaArray.push(parseFloat(goalie['xG Against']))
         hdsaArray.push(parseFloat(goalie['HD Shots Against']))
         hdsavesArray.push(parseFloat(goalie['HD Saves']))
         hdsvArray.push(parseFloat(goalie['HDSV%']))
         hdgsaaArray.push(parseFloat(goalie.HDGSAA))
         // Calculate per-60 rate from hdgsaa
         hdgsaa60Array.push(exports.calc_PER60(goalie.HDGSAA, goalie.TOI))
         // Calculate xSV% using SV% func
         xsvArray.push(decimalThree(exports.calc_SV(
            (goalie['Shots Against'] - goalie['xG Against']),
            goalie['Shots Against']
         )))
         // Calculate dSV% using SV% func
         dsvArray.push(exports.calc_DSV(
            goalie['SV%'],
            exports.calc_SV(
               (goalie['Shots Against'] - goalie['xG Against']),
               goalie['Shots Against']
            )
         ))

         goalieData.push({
            name: goalie.Player,
            team: goalie.Team.toUpperCase().replace(/[^A-Z]/, ''),
            gp: parseFloat(goalie.GP),
            toi: parseFloat(goalie.TOI),
            sa: parseFloat(goalie['Shots Against']),
            saves: parseFloat(goalie.Saves),
            sv: parseFloat(goalie['SV%']),
            gsaa: parseFloat(goalie.GSAA),
            // Calculate per-60 rate stats
            gsaa60: exports.calc_PER60(goalie.GSAA, goalie.TOI),
            xga: parseFloat(goalie['xG Against']),
            hdsa: parseFloat(goalie['HD Shots Against']),
            hdsaves: parseFloat(goalie['HD Saves']),
            hdsv: parseFloat(goalie['HDSV%']),
            hdgsaa: parseFloat(goalie.HDGSAA),
            // Calculate per-60 rate stats
            hdgsaa60: exports.calc_PER60(goalie.HDGSAA, goalie.TOI),
            // Calculate xSV% using SV% func
            xsv: decimalThree(exports.calc_SV(
               (goalie['Shots Against'] - goalie['xG Against']),
               goalie['Shots Against']
            )),
            // Calculate dSV% using SV% func
            dsv: exports.calc_DSV(
               goalie['SV%'],
               exports.calc_SV(
                  (goalie['Shots Against'] - goalie['xG Against']),
                  goalie['Shots Against']
               )
            )
         })

         return goalie
      });

      // FUTURE: go through goalieData, combine team stats
      
      // Map goalieData to create an array of goalie stats objects
      const newData = goalieData.map(({name, team, ...stats}) => (
         {
            id: goalie_id.returnID(name),
            name: name,
            team: team,
            // Calculate percentiles for each stat
            percentile: {
               gp: percentile(stats.gp, gpArray),
               toi: percentile(stats.toi, toiArray),
               sa: percentile(stats.sa, saArray),
               saves: percentile(stats.saves, savesArray),
               sv: percentile(stats.sv, svArray),
               gsaa: percentile(stats.gsaa, gsaaArray),
               gsaa60: percentile(stats.gsaa60, gsaa60Array),
               xga: percentile(stats.xga, xgaArray),
               hdsa: percentile(stats.hdsa, hdsaArray),
               hdsaves: percentile(stats.hdsaves, hdsavesArray),
               hdsv: percentile(stats.hdsv, hdsvArray),
               hdgsaa: percentile(stats.hdgsaa, hdgsaaArray),
               hdgsaa60: percentile(stats.hdgsaa60, hdgsaa60Array),
               xsv: percentile(stats.xsv, xsvArray),
               dsv: percentile(stats.dsv, dsvArray),
               },
            // Calculate rankings for each stat
            rank: {
               gp: rank(stats.gp, gpArray),
               toi: rank(stats.toi, toiArray),
               sa: rank(stats.sa, saArray),
               saves: rank(stats.saves, savesArray),
               sv: rank(stats.sv, svArray),
               gsaa: rank(stats.gsaa, gsaaArray),
               gsaa60: rank(stats.gsaa60, gsaa60Array),
               xga: rank(stats.xga, xgaArray),
               hdsa: rank(stats.hdsa, hdsaArray),
               hdsaves: rank(stats.hdsaves, hdsavesArray),
               hdsv: rank(stats.hdsv, hdsvArray),
               hdgsaa: rank(stats.hdgsaa, hdgsaaArray),
               hdgsaa60: rank(stats.hdgsaa60, hdgsaa60Array),
               xsv: rank(stats.xsv, xsvArray),
               dsv: rank(stats.dsv, dsvArray),
            },
            // Add stats obj
            stats: {
               ...stats
            }
         }
      ));

      fs.writeFile('../../data/JSON/5v5/stats_2018_5v5-combined.json', JSON.stringify(newData, null, 2), err => {
         if (err) throw err;
         console.log(err);
      });

	})