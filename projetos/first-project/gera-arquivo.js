const fs = require('fs');
const data = process.argv[3];

if (process.argv[2] == '--write' && process.argv[2] != '--read') {
  fs.appendFile('arquivo.txt', data + '\n', (err) => {
    if (err) throw err;
  });
}

if (process.argv[2] != '--write' && process.argv[2] != '--read') {
  console.log('\nParâmetro inválido!');
}

if (process.argv[2] == '--read') {
  fs.readFile('arquivo.txt', (err, data) => {
    if (err) throw err;
    const converteBuff = Buffer.from(data, "utf-8")
    let resultado = converteBuff.toString();
    console.log('\n' + resultado);
  });
}