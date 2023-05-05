const fs = require('fs');
const path = require('path');

const {stdout} = process;

const textPath = path.resolve(__dirname, 'text.txt');

const readStream = fs.createReadStream(textPath);

readStream.on('data', chunk => stdout.write(`${chunk}\n`));
readStream.on('error', error => console.log('Error', error.message));