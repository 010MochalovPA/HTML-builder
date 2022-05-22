const fs = require('fs');
const path = require('path');

const WriteStream = fs.createWriteStream(path.join(__dirname,'project-dist', 'bundle.css'));

fs.readdir(path.join(__dirname, 'styles'),{withFileTypes: true},(e,files)=>{
  files.forEach(file => {
    if (file.isFile() && path.extname(file.name) === '.css') {
      let data = '';
      const ReadStream = fs.createReadStream(path.join(__dirname,'styles', file.name), 'utf-8');
      ReadStream.on('data', chunk => data += chunk);
      ReadStream.on('end', () => WriteStream.write(`\n${data}`));
    }
  });
  
});



