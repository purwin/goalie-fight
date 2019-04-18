const csv=require('csvtojson')

const csvFilePath='../../../data-import-test-02.csv'

csv()
.fromFile(csvFilePath)
.then(jsonObj => {
   console.log(jsonObj);
})
