"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taxes_1 = require("../src/taxes");
test('Constructor sets Gross', () => {
    const taxAssessment = new taxes_1.TaxAssessment(100000, 2);
    expect(taxAssessment.gross).toBe(100000);
});
