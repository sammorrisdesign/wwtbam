const csvjson = require('csvjson')
const fs = require('fs-extra');

let data = new Object;

module.exports = {
  init() {
    data.steps = this.createSteps();
    data.games = this.compileGames();
    data.ff = this.getCSV('ff');

    // console.log(data);

    fs.writeJSONSync('src/javascript/data.json', data);

    return data;
  },

  createSteps() {
    const values = [1000000, 500000, 250000, 125000, 64000, 32000, 16000, 8000, 4000, 2000, 1000, 500, 300, 200, 100];

    let steps = new Array;

    values.forEach((value, i) => {
      steps.push({
        value: value,
        stringValue: value.toLocaleString(),
        index: values.length - i,
        isSafe: ((values.length - i) % 5) == 0
      });
    });

    return steps;
  },

  compileGames() {
    let games = new Array;

    games.push(this.getCSV('game--1'));
    games.push(this.getCSV('game--2'));
    games.push(this.getCSV('game--3'));
    games.push(this.getCSV('game--4'));
    games.push(this.getCSV('game--5'));
    games.push(this.getCSV('game--6'));
    games.push(this.getCSV('game--7'));

    return games;
  },

  getCSV(source) {
    const csv = fs.readFileSync(`${__dirname}/${source}.csv`, 'utf8');

    let game = csvjson.toObject(csv, {
      delimiter : ',',
      quote: '"'
    });

    return game;
  }

}