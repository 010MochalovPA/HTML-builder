const fs = require('fs');
const fsPromises = require('fs').promises
const path = require('path');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
    if (err) throw err;
});