const nodeFs = require('node:fs');
const path = require('path');

const dirPath = path.resolve(__dirname, 'secret-folder/');
console.log(dirPath);

nodeFs.readdir(dirPath, {withFileTypes: true}, (err, data) => {
  data.forEach((item) => {
    if (item.isFile() && item.name !== '.DS_Store') {
      const filePath = path.resolve(dirPath, item.name);
      const fileInfo = path.parse(filePath);

      nodeFs.stat(filePath, (err, stats) => {
        if (err) console.log(err.message);
        console.log(`${fileInfo.name} - ${fileInfo.ext} - ${stats.size} bytes`);
      });
    }

  });
});