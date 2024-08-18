const fs = require('fs');
const axios = require('axios');

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

async function webCat(url) {
    try {
        const response = await axios.get(url);
        console.log(response.data);
    } catch (err) {
        console.error(`Error fetching ${url}:\n  ${err}`);
        process.exit(1);
    }
}

const input = process.argv[2];
if (input) {
    if (input.startsWith('http')) {
        webCat(input);
    } else {
        cat(input);
    }
} else {
    console.error('Please provide a file path or URL as an argument.');
    process.exit(1);
}
