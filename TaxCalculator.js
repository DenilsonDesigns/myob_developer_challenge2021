class TaxCalculator {
  constructor(name, annSalary) {
    this.name = name;
    this.annSalary = annSalary;
    this.grossTax = this.calcTotalTax(annSalary);
    this.grossMonthlyIncome = annSalary / 12;
  }

  calcTotalTax(salary) {
    const TAX_RATES = {
      THRESHOLD_ONE: 0.1,
      THRESHOLD_TWO: 0.2,
      THRESHOLD_THREE: 0.3,
      THRESHOLD_FOUR: 0.4,
    };

    const THRESHOLDS = {
      THRESHOLD_ONE: 20001,
      THRESHOLD_TWO: 40001,
      THRESHOLD_THREE: 80001,
      THRESHOLD_FOUR: 180001,
    };

    let totalTax = 0;

    for (const [key, value] of Object.entries(TAX_RATES)) {
      if (salary > THRESHOLDS[key]) {
        totalTax += (salary - THRESHOLDS[key]) * value;
      }
    }
    // source: https://www.jacklmoore.com/notes/rounding-in-javascript/
    return Number(Math.round(totalTax + "e2") + "e-2");
  }

  getGrossTax() {
    return this.grossTax;
  }

  getGrossMonthlyIncome() {
    return this.grossMonthlyIncome;
  }

  monthlyTax() {
    return Number(Math.round(this.grossTax / 12 + "e2") + "e-2");
  }

  netMonthlyIncome() {
    return Number(
      Math.round(this.grossMonthlyIncome - this.monthlyTax() + "e2") + "e-2"
    );
  }

  makePaySlip() {
    let obj = {
      "Monthly Payslip for:": this.name,
      "Gross Monthly Income:": this.grossMonthlyIncome,
      "Monthly Income Tax:": this.monthlyTax(),
      "Net Monthly Income:": this.netMonthlyIncome(),
    };

    console.table(obj);
  }
}

module.exports = {
  TaxCalculator: TaxCalculator,
};
