const fs = require('fs');
const fsPromises = require('fs').promises
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


// fs.readFile(path.join(__dirname, 'template.html'), "utf8", (err,data) => {
//     if(err) throw err;
//     template = data;  
//     fs.readdir(path.join(__dirname, 'components'),{withFileTypes: true},(err,files)=>{
//         files.forEach(file => {
//             let componentData = ''
//             const component = path.basename(file.name, path.extname(file.name)).toString();
//             const ReadStreamComponent = fs.createReadStream(path.join(__dirname,'components' ,`${component}.html`), 'utf-8');
//             template = template.replace('{{' + component + '}}', componentData.toString());
//             console.log(template)
//         });
//     });
// });


// const ReadStream = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');
// ReadStream.on('data', chunk => template += chunk);
// ReadStream.on('end', ()=> {
//     let data = template;
//     fs.readdir(path.join(__dirname, 'components'),{withFileTypes: true},(e,files)=>{
//         files.forEach(file => {
//             const component = path.basename(file.name, path.extname(file.name)).toString();
//             const ReadStreamComponent = fs.createReadStream(path.join(__dirname,'components' ,`${component}.html`), 'utf-8');
//             let componentData = '';
//             ReadStreamComponent.on('data', chunk => componentData += chunk);
//             ReadStreamComponent.on('end', () => {
//                 console.log(component)
//                 console.log('---------')
//                 data = data.replace('{{' + component + '}}', componentData.toString() );
//             });
//             console.log(data);
//         });
//     });
// });




 // components.forEach(component => {
    //     const ReadStreamComponent = fs.createReadStream(path.join(__dirname,'components' ,`${component}.html`), 'utf-8');
    //     let componentData = '';
    //     // ReadStreamComponent.on('data', chunk => componentData += chunk);
    //     // ReadStreamComponent.on('end', () => {
    //     // //     console.log(componentData);
    //     // });
    //     // // ReadStreamComponent.pipe(WriteStream);
    // })
    // let data = '';
    // ReadStream.on('data', chunk => data += chunk);
    // ReadStream.on('end', () => {
        
    //     components.forEach(component => {
    //         const ReadStream = fs.createReadStream(path.join(__dirname,'components' ,`${component}.html`), 'utf-8');
    //         let componentData = '';
    //         ReadStream.on('data', chunk => componentData += chunk);
    //         ReadStream.on('end', () => {
    //             data = data.replace('{{' + component + '}}', componentData );
    //             WriteStream.write(data);
    //         });
            
    //     });
        
        
        
    // });

//   if (file.isFile() && path.extname(file.name) === '.css') {
//     let data = '';
//     const ReadStream = fs.createReadStream(path.join(__dirname,'styles', file.name), 'utf-8');
//     ReadStream.on('data', chunk => data += chunk);
//     ReadStream.on('end', () => WriteStream.write(`${data}\n`));
//   }