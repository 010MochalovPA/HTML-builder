const fs = require('fs');
const path = require('path');
const ReadStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
let data = '';
ReadStream.on('data', chunk => data += chunk);
ReadStream.on('end', () => console.log(data));