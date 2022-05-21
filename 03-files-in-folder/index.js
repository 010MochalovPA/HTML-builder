const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'),{withFileTypes: true},(e,files)=>{
  files.forEach(file => {
      fs.stat(path.join(__dirname,'secret-folder', file.name),(e, stats)=>{
        const filename = path.basename(file.name, path.extname(file.name));
        const extname = path.extname(file.name).substring(1, path.extname(file.name).length);
        const filesize = stats.size / 1024;
        if (stats.isFile()) console.log(`${filename} - ${extname} - ${filesize}kb`)
      })
  })
});
