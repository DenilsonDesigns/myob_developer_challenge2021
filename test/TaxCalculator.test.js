const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
const TaxCalc = require("../TaxCalculator").TaxCalculator;

describe("Class instantiates correctly", () => {
  let taxCalc = new TaxCalc("Mary Smith", 60000);

  it("Has a name property of 'Mary Smith'", () => {
    expect(taxCalc.name).to.equal("Mary Smith");
  });

  it("Has a 'annSalary' property of 60000", () => {
    expect(taxCalc.annSalary).to.equal(60000);
  });
});

describe("Methods function correctly", () => {
  let taxCalc = new TaxCalc("Mary Smith", 60000);

  // calcTax on tax-free threshold.
  it("Calculates 0 tax for salary below 20000", () => {
    let taxCalc = new TaxCalc("Mary Smith", 18000);

    expect(taxCalc.getGrossTax()).to.equal(0);
  });

  // calcTax on first threshold (0.1)
  it("Calculates tax correctly for salary above 20001 and below 40000", () => {
    const SALARY = 21001;
    let taxCalc = new TaxCalc("Mary Smith", SALARY);

    let expectedTax = (SALARY - 20001) * 0.1;
    expectedTax = Number(Math.round(expectedTax + "e2") + "e-2");

    expect(taxCalc.getGrossTax()).to.equal(expectedTax);
  });

  it("Calculates tax correctly for salary above 40000 and below 80000", () => {
    const SALARY = 60000;
    let taxCalc = new TaxCalc("Mary Smith", SALARY);

    let expectedTax = (SALARY - 20001) * 0.1;
    expectedTax += (SALARY - 40001) * 0.2;
    expectedTax = Number(Math.round(expectedTax + "e2") + "e-2");

    expect(taxCalc.getGrossTax()).to.equal(expectedTax);
  });

  it("Calculates tax correctly for salary above 80000 and below 180000", () => {
    const SALARY = 90000;
    let taxCalc = new TaxCalc("Mary Smith", SALARY);

    let expectedTax = (SALARY - 20001) * 0.1;
    expectedTax += (SALARY - 40001) * 0.2;
    expectedTax += (SALARY - 80001) * 0.3;
    expectedTax = Number(Math.round(expectedTax + "e2") + "e-2");

    expect(taxCalc.getGrossTax()).to.equal(expectedTax);
  });

  it("Calculates tax correctly for salary above 180001", () => {
    const SALARY = 190000;
    let taxCalc = new TaxCalc("Mary Smith", SALARY);

    let expectedTax = (SALARY - 20001) * 0.1;
    expectedTax += (SALARY - 40001) * 0.2;
    expectedTax += (SALARY - 80001) * 0.3;
    expectedTax += (SALARY - 180001) * 0.4;
    expectedTax = Number(Math.round(expectedTax + "e2") + "e-2");

    expect(taxCalc.getGrossTax()).to.equal(expectedTax);
  });

  it("getGrossTax returns gross tax amount", () => {
    // could put any calc here really, just test it returns a valid tax amt.
    const SALARY = 90000;
    let taxCalc = new TaxCalc("Mary Smith", SALARY);

    let expectedTax = (SALARY - 20001) * 0.1;
    expectedTax += (SALARY - 40001) * 0.2;
    expectedTax += (SALARY - 80001) * 0.3;
    expectedTax = Number(Math.round(expectedTax + "e2") + "e-2");

    expect(taxCalc.getGrossTax()).to.equal(expectedTax);
  });

  it("getGrossMonthlyIncome returns correct monthly income", () => {
    const SALARY = 90000;
    let taxCalc = new TaxCalc("Mary Smith", SALARY);

    expect(taxCalc.getGrossMonthlyIncome()).to.equal(7500);
  });

  it("monthlyTax returns correct monthly tax amount", () => {
    const SALARY = 90000;
    let taxCalc = new TaxCalc("Mary Smith", SALARY);

    expect(taxCalc.monthlyTax()).to.equal(1666.62);
  });

  it("netMonthlyIncome returns correct monthly income minus tax", () => {
    const SALARY = 90000;
    let taxCalc = new TaxCalc("Mary Smith", SALARY);

    expect(taxCalc.netMonthlyIncome()).to.equal(5833.38);
  });
});
