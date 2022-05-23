const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
    if (err) throw err;
});

const ReadStream = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');
let template = '';
ReadStream.on('data', chunk => template += chunk);
ReadStream.on('end', ()=> {
    fs.readdir(path.join(__dirname, 'components'),{withFileTypes: true},(err,files)=>{
        files.forEach(file => {
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
        
        });
    });
});

