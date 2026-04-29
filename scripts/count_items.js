const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'src', 'data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.js'));

let total = 0;
const counts = {};

files.forEach(file => {
  const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
  // Count how many times "id:" appears (basic heuristic for objects)
  const matches = content.match(/id:\s*\d+/g);
  const count = matches ? matches.length : 0;
  counts[file] = count;
  total += count;
});

console.log("Counts per file:", counts);
console.log("Total:", total);
