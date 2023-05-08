const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const originalPath = path.resolve(__dirname, 'styles/');
const distPath = path.resolve(__dirname, 'project-dist/');
const bundlePath = path.resolve(distPath, 'bundle.css');

fsPromises.readdir(distPath, {withFileTypes: true})
  .then(data => {
    for (let item of data) {
      const ext = path.extname(path.resolve(distPath, item.name));
      if (ext === '.css') {
        fsPromises.unlink(path.resolve(distPath, item.name))
          .catch(err => {
            if (err) console.log(err);
          });
      }
    }
  });



fsPromises.readdir(originalPath, {withFileTypes: true})
  .then(data => {
    const writeStream = fs.createWriteStream(bundlePath);
    for (let item of data) {
      if (item.isFile()) {
        const filePath = path.resolve(originalPath, item.name);
        const ext = path.extname(filePath);
        if (ext === '.css') {
          const readStream = fs.createReadStream(filePath);
          readStream.on('data', data => {
            writeStream.write(data + '\n');
          });
        }
      }
    }
  });
