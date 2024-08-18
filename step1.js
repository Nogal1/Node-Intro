const fs = require('fs');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}:\n  ${err}`);
            process.exit(1);
        } else {
            console.log(data);
        }
    });
}

const filePath = process.argv[2];
if (filePath) {
    cat(filePath);
} else {
    console.error('Please provide a file path as an argument.');
    process.exit(1);
}
