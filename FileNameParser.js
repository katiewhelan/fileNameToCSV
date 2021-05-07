
var filePathToReadFrom  = process.argv[2];
const { v4: uuidv4 } = require('uuid');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'out.csv',
  header: [
    {id: 'objectId', title: 'ObjectId'},
    {id: 'title', title: 'Title'},
    {id: 'own', title:'Own'},
  ]
});

const path = require("path");
const fs = require("fs");
//const directoryPath = path.join(__dirname, "files");
const directoryPath = filePathToReadFrom;
const data =[];


console.log("This is the filepage " + filePathToReadFrom);

fs.readdir(directoryPath, function(err, files) {
  if(err){
    return console.log("Could not scan directory " + err);
  }

  files.forEach(function(file) {
    var nameToSave = file.split('.')[0];
    var newGuid = uuidv4();
    let obj = {
      objectId: newGuid,
      own: true,
      title: nameToSave,
    };
    data.push(obj);

    console.log("File Name to save " + nameToSave);

  });
  csvWriter
    .writeRecords(data)
    .then(()=> console.log('The CSV file was written successfully'));

});
