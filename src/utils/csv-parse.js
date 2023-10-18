import { parse } from "csv-parse";
import fs from "node:fs";

function csvParse(csv) {
  const baseUrl = 'http://localhost:3333'

  fs.createReadStream(csv)
    .pipe(parse({ delimiter: ',', from_line: 2 }))
    .on('data', row => { 
      fetch(baseUrl + '/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: row[0],
          description: row[1],
        })
      })
    })
    .on('end', () => { console.log("Document read with successfully"); })
}

const csvPath = new URL('../../node-desafio-01.csv', import.meta.url)
csvParse(csvPath)