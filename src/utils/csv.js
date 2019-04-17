const csv=require('csvtojson')

const csvFilePath='<path to csv file>'

csv()
.fromFile(csvFilePath)
.then(jsonObj => {
   console.log(jsonObj);
})
