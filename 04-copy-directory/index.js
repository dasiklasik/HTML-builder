const fsPromises = require('fs/promises');
const path = require('path');

(function copyDir (){
  const originalPath = path.resolve(__dirname, 'files/');
  const newPath =  path.resolve(__dirname, 'files-copy/');

  fsPromises.mkdir(newPath, {recursive: true})
    .then(() => {

      return fsPromises.readdir(newPath, {withFileTypes: true});
    })
    .then(data => {
      for (let item of data) {
        fsPromises.unlink(path.resolve(newPath, item.name))
          .catch(err => {
            if (err) console.log(err);
          });
      }
      return fsPromises.readdir(originalPath, {withFileTypes: true});
    })
    .then((data) => {
      for (let item of data) {
        const filePath = path.resolve(originalPath, item.name);
        const newFilePath = path.resolve(newPath, item.name);
        fsPromises.copyFile(filePath, newFilePath)
          .catch(err => {
            if (err) console.log(err);
          });
      }
    });
})();
