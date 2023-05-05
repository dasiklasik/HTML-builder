const fs = require('fs');
const path = require('path');
const {stdout, stdin} = process;

const filePath = path.resolve(__dirname, 'text.txt');

const writeStream = fs.createWriteStream(filePath);

stdout.write('Введите текст\n');

stdin.on('data', data => {
  const parse = data.toString();
  if (parse.trim() === 'exit') {
    process.exit();
  } else {
    writeStream.write(parse);
  }
});


