const fs = require('fs');
const axios = require('axios');

function handleOutput(content, outputPath) {
    if (outputPath) {
        fs.appendFile(outputPath, content + '\n', 'utf8', (err) => {
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

function processInput(input, outputPath) {
    if (input.startsWith('http')) {
        webCat(input, outputPath);
    } else {
        cat(input, outputPath);
    }
}

let outputPath;
let inputs;

if (process.argv[2] === '--out') {
    outputPath = process.argv[3];
    inputs = process.argv.slice(4);
} else {
    inputs = process.argv.slice(2);
}

if (inputs.length === 0) {
    console.error('Please provide at least one file path or URL as an argument.');
    process.exit(1);
}

for (let input of inputs) {
    processInput(input, outputPath);
}
