import { TaxAssessment } from '../taxes';

test('Constructor sets Gross', () => {
    const taxAssessment = new TaxAssessment(100000, 2);
    expect(taxAssessment.gross).toBe(100000);
  });
  
  export {};