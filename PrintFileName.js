
const { v4: uuidv4 } = require('uuid');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'out.csv',
  header: [
    {id: 'objectId', title: 'ObjectId'},
    {id: 'title', title: 'Title'},
  ]
});

const path = require("path");
const fs = require("fs");
const directoryPath = path.join(__dirname, "files");
const data =[];

fs.readdir(directoryPath, function(err, files) {
  if(err){
    return console.log("Could not scan directory " + err);
  }

  files.forEach(function(file) {
    var removeEndText = file.split('.')[0];
    var newGuid = uuidv4();
    let obj = {
      objectId: newGuid,
      own: true,
      title: removeEndText,
    };
    data.push(obj);

    console.log(removeEndText);


  });
  csvWriter
    .writeRecords(data)
    .then(()=> console.log('The CSV file was written successfully'));

});
