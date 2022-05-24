
const fs = require('fs');
const path = require('path');
function copyDir(){
  fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
    if (err) throw err;
    console.log('Директория files-copy создана!');
  
    fs.readdir(path.join(__dirname, 'files-copy'),(e,files)=>{
      files.forEach(file => {
        fs.unlink(path.join(__dirname, 'files-copy' , file), (err) => {
          if (err) throw err;
        });
      });
  
      fs.readdir(path.join(__dirname, 'files'),(e,files)=>{
        files.forEach(file => {
          fs.copyFile(path.join(__dirname, 'files' , file), path.join(__dirname, 'files-copy' , file), (err) => {
            if (err) throw err;
            console.log(`${file} скопирован`);
          });
        });
      });
    });
  });
}

copyDir();
