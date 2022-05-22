const fs = require('fs');
const process = require('process');
const path = require('path');


const WriteStream = fs.createWriteStream(path.join(__dirname, 'output.txt'));

process.stdout.write('Введите текст:\n');
process.stdin.on('data', data => {
  if (data.toString().trim() === 'exit') process.exit();
  WriteStream.write(data);
});

process.on('SIGINT', () => process.exit());
process.on('exit', () => process.stdout.write('Удачи в изучении Node.js!'));
