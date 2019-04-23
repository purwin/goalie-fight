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
const calc_DSV = (sv, xsv) => decimalThree((parseFloat(sv) * 100) - (parseFloat(xsv) * 100));

// Function that calculates per-60 stats
// Receives 2 arguments: a value and time in mins (numbers as string or int)
// Returns an int
const calc_PER60 = (val, mins) => decimalThree((parseFloat(val) / parseFloat(mins)) * 60);

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


const decimalThree = num => Number(num.toFixed(3));

csv()
	.fromFile(csvFilePath)
	.then(jsonObj => {
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

      jsonObj.map(goalie => {
         gpArray.push(parseFloat(goalie.GP))
         toiArray.push(goalie.TOI)
         gpArray.push(parseFloat(goalie.GP))
         toiArray.push(parseFloat(goalie.TOI))
         saArray.push(parseFloat(goalie['Shots Against']))
         savesArray.push(parseFloat(goalie.Saves))
         svArray.push(parseFloat(goalie['SV%']))
         gsaaArray.push(parseFloat(goalie.GSAA))
         gsaa60Array.push(calc_PER60(goalie.GSAA, goalie.TOI))
         xgaArray.push(parseFloat(goalie['xG Against']))
         hdsaArray.push(parseFloat(goalie['HD Shots Against']))
         hdsavesArray.push(parseFloat(goalie['HD Saves']))
         hdsvArray.push(parseFloat(goalie['HDSV%']))
         hdgsaaArray.push(parseFloat(goalie.HDGSAA))
         hdgsaa60Array.push(calc_PER60(goalie.HDGSAA, goalie.TOI))
         xsvArray.push(decimalThree(calc_SV(
               (goalie['Shots Against'] - goalie['xG Against']),
               goalie['Shots Against']
         )))
         dsvArray.push(calc_DSV(
               goalie['SV%'],
               calc_SV(
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
            gsaa60: calc_PER60(goalie.GSAA, goalie.TOI),
            xga: parseFloat(goalie['xG Against']),
            hdsa: parseFloat(goalie['HD Shots Against']),
            hdsaves: parseFloat(goalie['HD Saves']),
            hdsv: parseFloat(goalie['HDSV%']),
            hdgsaa: parseFloat(goalie.HDGSAA),
            hdgsaa60: calc_PER60(goalie.HDGSAA, goalie.TOI),
            xsv: decimalThree(calc_SV(
                  (goalie['Shots Against'] - goalie['xG Against']),
                  goalie['Shots Against']
            )),
            dsv: calc_DSV(
                  goalie['SV%'],
                  calc_SV(
                        (goalie['Shots Against'] - goalie['xG Against']),
                           goalie['Shots Against']
                  )
            )
         })
         return goalie
      });

      const newData = goalieData.map(({name, team, ...stats}) => (
         {
            name: name,
            team: team,
            percentile: {
                  p_gp: percentile(stats.gp, gpArray),
                  p_toi: percentile(stats.toi, toiArray),
                  p_sa: percentile(stats.sa, saArray),
                  p_saves: percentile(stats.saves, savesArray),
                  p_sv: percentile(stats.sv, svArray),
                  p_gsaa: percentile(stats.gsaa, gsaaArray),
                  p_gsaa60: percentile(stats.gsaa60, gsaa60Array),
                  p_xga: percentile(stats.xga, xgaArray),
                  p_hdsa: percentile(stats.hdsa, hdsaArray),
                  p_hdsaves: percentile(stats.hdsaves, hdsavesArray),
                  p_hdsv: percentile(stats.hdsv, hdsvArray),
                  p_hdgsaa: percentile(stats.hdgsaa, hdgsaaArray),
                  p_hdgsaa60: percentile(stats.hdgsaa60, hdgsaa60Array),
                  p_xsv: percentile(stats.xsv, xsvArray),
                  p_dsv: percentile(stats.dsv, dsvArray),
            },
            stats: {
                  ...stats
            }
         }
      ));

      fs.writeFile('../../data/stats_2018_5v5-02.json', JSON.stringify(newData, null, 2), err => {
         if (err) throw err;
         console.log(err);
      });

	})