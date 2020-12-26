const csvjson = require('csvjson')
const fs = require('fs-extra');

let data = new Object;

module.exports = {
  init() {
    data.steps = this.createSteps();

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
  }
}