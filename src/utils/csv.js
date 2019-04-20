const csv = require('csvtojson')
const fs = require('fs')

const csvFilePath = '../../data/stats_2018_5v5.csv'

// Function that calculates save percentage
// Receives 2 arguments: saves and shots (numbers as string or int)
// Returns a decimal int
const calc_SV = (saves, shots) => parseFloat(saves) / parseFloat(shots);

// Function that calculates dSV% (SV% - xSV%)
// Receives 2 arguments: SV% and xSV% (numbers as string or int)
// Returns an int
const calc_DSV = (sv, xsv) => (parseFloat(sv) * 100) - (parseFloat(xsv) * 100);

// Function that calculates per-60 stats
// Receives 2 arguments: a value and time in mins (numbers as string or int)
// Returns an int
const calc_PER60 = (val, mins) => ((parseFloat(val) / parseFloat(mins)) * 60);


csv()
	.fromFile(csvFilePath)
	.then(jsonObj => {
      const newData = jsonObj.map(goalie => (
      	{
      		name: goalie.Player,
      		team: goalie.Team.toUpperCase().replace(/[^A-Z]/, ''),
      		gp: parseFloat(goalie.GP),
      		toi: parseFloat(goalie.TOI),
      		sa: parseFloat(goalie['Shots Against']),
      		saves: parseFloat(goalie.Saves),
      		sv: parseFloat(goalie['SV%']),
      		gsaa: parseFloat(goalie.GSAA),
      		gsaa60: calc_PER60(goalie.GSAA, goalie.TOI),
      		xga: parseFloat(goalie['xG Against']),
      		hdsa: parseFloat(goalie['HD Shots Against']),
      		hdsaves: parseFloat(goalie['HD Saves']),
      		hdsv: parseFloat(goalie['HDSV%']),
      		hdgsaa: parseFloat(goalie.HDGSAA),
      		hdgsaa60: calc_PER60(goalie.HDGSAA, goalie.TOI),
      		xsv: calc_SV(
      				(goalie['Shots Against'] - goalie['xG Against']),
      				goalie['Shots Against']
      		),
            dsv: calc_DSV(
                  goalie['SV%'],
                  calc_SV(
                        (goalie['Shots Against'] - goalie['xG Against']),
                         goalie['Shots Against']
                  )
            )
      	}
      ));

      fs.writeFile('../../data/stats_2018_5v5.json', JSON.stringify(newData, null, 2), err => {
         if (err) throw err;
         console.log(err);
      });
	})