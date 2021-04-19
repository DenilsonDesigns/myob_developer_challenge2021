const TaxCalculator = require("./TaxCalculator").TaxCalculator;
// source: https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/
let myArgs = process.argv.slice(2);
let employeeName = "";
let employeeSalary = 0;

// *** check name
let name = myArgs[0];
if (parseInt(name) || name.length < 1) {
  console.log("please enter a valid name (not digits)");
  process.exit();
} else {
  employeeName = name;
}

let salary = myArgs[1];
// ***check salary is valid.
if (!parseInt(salary) || parseInt(salary) < 1) {
  console.log("Please parse in a valid salary (valid number above 0)");
  process.exit();
} else {
  employeeSalary = salary;
}

let taxCalc = new TaxCalculator(employeeName, employeeSalary);
taxCalc.makePaySlip();
