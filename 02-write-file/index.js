const fs = require('fs');
const { stdin, stdout } = process;
const path = require('path');


const WriteStream = fs.createWriteStream(path.join(__dirname, 'output.txt'));

stdout.write('Как тебя зовут?\n');
stdin.on('data', data => {
  if (data.toString().trim() === 'exit') process.exit();
  WriteStream.write(data);
});

process.on('SIGINT', () => process.exit());
process.on('exit', () => stdout.write('Удачи в изучении Node.js!'));
