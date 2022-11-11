const correctEndOfFile = {
    pattern: '/src\/.*\.js/g',
    checkFile: (content, filepath) => {
        if (content.endsWith('\n')) {
            return []
        } else {
            console.log(`Строка: ${content.split('\n').length}, ${filepath}: в данном файле отсутствует перенос строки в конце`);
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

for (let item of collection) {
    const pathToDownloadedRepository = await downloadRepository(item.repositoryPath);
    const allErrorsInRepository = [];
    for (let rule of item.rules) {
        const files = await glob(rule.pattern, { root: pathToDownloadedRepository });
        for (let filePath of files) {
            const content = readContent(filePath);

            const errors = rule.checkFile(content, filePath);

            allErrorsInRepository.push(...errors);        
        }
    }
}