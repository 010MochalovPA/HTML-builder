const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) throw err;

  const ReadStream = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');
  let template = '';
  ReadStream.on('data', chunk => template += chunk);
  ReadStream.on('end', ()=> {
    fs.readdir(path.join(__dirname, 'components'),{withFileTypes: true},(err,files)=>{
      files.forEach(file => {
        if (file.isFile() && path.extname(file.name) === '.html'){
          let componentData = '';
          const component = path.basename(file.name, path.extname(file.name)).toString();
          const ReadStreamComponent = fs.createReadStream(path.join(__dirname,'components' ,`${component}.html`), 'utf-8');
          const indexComponent = template.substring(0,template.indexOf('{{' + component+ '}}')).length - template.substring(0,template.indexOf('{{' + component+ '}}')).lastIndexOf('\n') -1;
          ReadStreamComponent.on('data', chunk => componentData += chunk);
          ReadStreamComponent.on('end', () => {
            const WriteStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
            template = template.replace(' '.repeat(indexComponent) +'{{' + component + '}}', componentData.split('\n').map(line => ' '.repeat(indexComponent) + line).join('\n') );
            WriteStream.write(template);
          });
        }
      });
    });
  });

  const WriteStream = fs.createWriteStream(path.join(__dirname,'project-dist', 'style.css'));
  fs.readdir(path.join(__dirname, 'styles'),{withFileTypes: true},(e,files)=>{
    files.forEach(file => {
      if (file.isFile() && path.extname(file.name) === '.css') {
        let data = '';
        const ReadStream = fs.createReadStream(path.join(__dirname,'styles', file.name), 'utf-8');
        ReadStream.on('data', chunk => data += chunk);
        ReadStream.on('end', () => WriteStream.write(`${data}\n`));
      }
    });
  });

  fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, (err) => {
    if (err) throw err;
    fs.readdir(path.join(__dirname, 'assets'),{withFileTypes: true},(e,folders)=>{
      folders.forEach(folder => {
        fs.mkdir(path.join(__dirname, 'project-dist', 'assets', folder.name), { recursive: true }, (err)=>{
          if (err) throw err;
          fs.readdir(path.join(__dirname, 'assets', folder.name),{withFileTypes: true},(e,files)=>{
            files.forEach(file =>{
              fs.copyFile(path.join(__dirname, 'assets' , folder.name , file.name), path.join(__dirname, 'project-dist','assets' , folder.name, file.name), (err) => {
                if (err) throw err;
              });
            });
          });
        });
      });
    });
  });
});





