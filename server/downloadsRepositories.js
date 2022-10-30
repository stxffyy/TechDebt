const { exec } = require("child_process");

const repositoryPath = 'https://github.com/stxffyy/CV-2.0';
const tempFolderName = 'tmp';

function downloadRepository() {
    exec(`cd ${tempFolderName} && git clone ${repositoryPath}`, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});
}

//downloadRepository();


const rule = {
    pattern: '/src\/.*\.js/g',
    checkFile: (content, filepath) => {
        if (content.endsWith('\n')) {
            return []
        } else {
            return (`${content.split('\n').length} && ${filepath}: в данном файле отсутствует перенос строки в конце`);
        }
    }

}


let fs = require('fs');
let readFrom = 'C:/Users/great/OneDrive - ITMO UNIVERSITY/Рабочий стол/VSCode/Диплом/server'; 

function getListOfFiles(path){
   fs.readdir(path, (err, files) => {
      if(err) throw err;

      for (let file of files){
         fs.stat('downloadRepositories.js', (errStat, status) => {
            if(errStat) throw errStat;

            if(status.isDirectory()){
               console.log('Папка: ' + file);
               listObjects(path + '/' + file); // продолжаем рекурсию
            }else{
               console.log('Файл: ' + file);
            }
         });
      }
   });
}

getListOfFiles(readFrom);


const filePath = "./tmp/CV-2.0/CV.html"; 

function readContent(filePath) {
    fs.readFile(filePath,
    function(err, data) {
        if (err) {
            console.log(err)
        } else {
            console.log(data.toString())
        }
    }
)
}

readContent(filePath);


//rule.checkFile(readContent, filePath)







