const fs = require('fs');
const axios = require('axios');

function handleOutput(content, outputPath) {
    if (outputPath) {
        fs.writeFile(outputPath, content, 'utf8', (err) => {
            if (err) {
                console.error(`Couldn't write ${outputPath}:\n  ${err}`);
                process.exit(1);
            }
        });
    } else {
        console.log(content);
    }
}

function cat(path, outputPath) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}:\n  ${err}`);
            process.exit(1);
        } else {
            handleOutput(data, outputPath);
        }
    });
}

async function webCat(url, outputPath) {
    try {
        const response = await axios.get(url);
        handleOutput(response.data, outputPath);
    } catch (err) {
        console.error(`Error fetching ${url}:\n  ${err}`);
        process.exit(1);
    }
}

let outputPath;
let input;

if (process.argv[2] === '--out') {
    outputPath = process.argv[3];
    input = process.argv[4];
} else {
    input = process.argv[2];
}

if (input) {
    if (input.startsWith('http')) {
        webCat(input, outputPath);
    } else {
        cat(input, outputPath);
    }
} else {
    console.error('Please provide a file path or URL as an argument.');
    process.exit(1);
}
