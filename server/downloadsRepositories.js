let { exec } = require("child_process");
let path = require("path");
let glob = require('glob')
let fs = require('fs');
 
let readFrom = 'C:/Users/great/Desktop/techDebtKiller/server'
let repositoryPath = 'https://github.com/stxffyy/CV-2.0';
let tempFolderName = 'tmp';
let listOfFiles = ''
let contentOfFile = ''
let pathOfFile = ''

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
    // pattern: '/src\/.*\.js/g',
    checkFile: (content, filepath) => {
        if (content.endsWith('\n')) {
            return []
        } else {
            console.log(`Строка: ${content.split('\n').length}, ${filepath}: в данном файле отсутствует перенос строки в конце`);
        }
    }
}


// Получаем коллекцию из названий файлов, подходящих под маску
glob('*.js', (err, files) => {
        if (err) {
            console.error(err)
        }
            collectionOfFiles = files
            console.log(collectionOfFiles)
            //return collectionOfFiles
        })



// Функция, на вход которой поступает путь до директории
function getListOfFiles(path){

    // Читаем директорию
   fs.readdir(path, (err) => {
      if (err) throw err;

      // Пробегаемся по всем элементам (файлам) из коллекции
      collectionOfFiles.map((item) => {
        fs.stat('downloadRepositories.js', (errStat, status) => {
            if (errStat) throw errStat;

            if (status.isDirectory()) {
               console.log('Папка: ' + item);
               listObjects(path + '/' + item); // продолжаем рекурсию

              // Если элемент - файл, то создаём строку с путём до него и кладём в pathOfFile и выводим его контент в contentOfFile
            } else if (status.isFile()) { 
        
                // Выводим имя файла
                listOfFiles = `Файл: ${item}`
                //console.log (listOfFiles) 

                // pathOfFile = __filename

                pathOfFile = readFrom + '/' + item
                console.log(pathOfFile)


                contentOfFile = fs.readFile(pathOfFile, function(err, data) {
                    if (err) {
                        console.log(err)
                    } else {
                        // console.log(data.toString())
                        contentOfFile = data.toString()
                        console.log(contentOfFile)

                        // if (contentOfFile.endsWith('\n')){
                        //     return []
                        // } else {
                        //     console.log(`Строка: ${contentOfFile.split('\n').length}, ${pathOfFile}: в данном файле отсутствует перенос строки в конце`);
                        // }
                    }
                })
            }
         })
      })  
   })
}

getListOfFiles(readFrom)



// Сюда я пыталась передать имя пути с помощью pathOfFile из функции getListOfFiles и получить контент, но не работает
function readContent(pathOfFile) {
    fs.readFile(pathOfFile,
    function(err, data) {
        if (err) {
            console.log(err)
        } else {
            //console.log(data.toString())
            contentOfFile = data.toString()
            console.log(contentOfFile)
        }
    })
}

readContent(pathOfFile)



//rule.checkFile(readContent, filePath)
//rule.glob()






