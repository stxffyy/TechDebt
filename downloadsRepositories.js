const fs =  require("node:fs");

const fsPromises =  require("node:fs/promises");

let { exec } = require("child_process");
let path = require("path");
let glob = require('glob')

 
let readFrom = __dirname;
console.log('readFrom', readFrom);
let repositoryPath = 'https://github.com/stxffyy/CV-2.0';
let tempFolderName = 'tmp';
let listOfFiles = ''
let contentOfFile = ''
let pathOfFile = ''

// http://git/sdsdsdsd
function downloadRepository(repositoryPath) {
    return new Promise((resolve, reject) => {
        const folderName = path.resolve(tempFolderName, repositoryPath.split('/').slice(-1)[0])
        exec(`cd ${tempFolderName} && git clone ${repositoryPath}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);

                return reject(error);
            }
            // if (stderr) {
            //     console.log(`stderr: ${stderr}`);
            //     return reject(new Error(stderr));
            // }

            console.log(`stdout: ${stdout}`);
            return resolve(folderName);
        });
    });
}

//downloadRepository();


const correctEndOfFile = {
    pattern: '*(*.js|*.html|*.json|*.css)',
    checkFile: (content, filepath) => {
        if (content.endsWith('\n')) {
            return []
        } else {
            return [
                {
                    message: ` данном файле отсутствует перенос строки в конце`,
                    lineNumber: content.split('\n').length,
                    columnNumber: 0,
                    filepath
                }
            ]
        }
    }
}

const collection = [
    {
        repositoryPath: 'https://github.com/stxffyy/CV-2.0',
        rules: [
            correctEndOfFile
        ]
    },
    {
        repositoryPath: 'https://github.com/stxffyy/TechDebt',
        rules: [
            correctEndOfFile
        ]
    }
]

function deleteFolderRecursive(path) {
    if(fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file) {
          var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

async function analyze() {
    try {
        deleteFolderRecursive(tempFolderName);
    } catch(e) {
        console.log(e);
    }
    try {
        fs.mkdirSync(tempFolderName);
    } catch(e) {}
    for (let item of collection) {
        // console.log('downloading', item.repositoryPath);
        const pathToDownloadedRepository = await downloadRepository(item.repositoryPath);
        // console.log('pathToDownloadedRepository', pathToDownloadedRepository);
        const allErrorsInRepository = [];
        for (let rule of item.rules) {
            const files = await promisifiedGlob(rule.pattern, { cwd: pathToDownloadedRepository });
            for (let filePath of files) {
                const content = (await fsPromises.readFile(path.resolve(pathToDownloadedRepository, filePath))).toString();
    
                // console.log(content);
                const errors = rule.checkFile(content, filePath);
                // console.log(errors);
                allErrorsInRepository.push(...errors); 
            }
        }
        console.log('allErrorsInRepository', allErrorsInRepository);
    }
}

function promisifiedGlob(pattern, settings) {
    return new Promise((resolve, reject) => {

        glob(pattern, settings, (err, files) => {
            if (err) {
                return reject(err);
            }
            resolve(files);
        })
    })

}

analyze();







