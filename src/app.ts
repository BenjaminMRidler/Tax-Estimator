import { TaxAssessment } from './taxes';

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const percentageFormatter = new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 });

const asCurrency = (value: number) => currencyFormatter.format(value);
const asPercent = (value: number) => percentageFormatter.format(value);

const fullDisplay: boolean = false;

if(!fullDisplay) console.log(`Gross\t\tEffective Rate`);

for(let i = 0; i <= 300000; i+=5000) {
    const taxAssement = new TaxAssessment(i, 2);

    if(fullDisplay) {
    console.log(`
        Gross:\t\t\t${asCurrency(taxAssement.gross)}
        Social Security:\t${asCurrency(taxAssement.socialSecurity)}
        Medicare:\t\t${asCurrency(taxAssement.medicare)}
        Additional Medicare:\t${asCurrency(taxAssement.additionalMedicare)}
        AGI:\t\t\t${asCurrency(taxAssement.agi)}
        Federal:\t\t${asCurrency(taxAssement.federal)}
        State:\t\t\t${asCurrency(taxAssement.state)}
        Total Taxes:\t\t${asCurrency(taxAssement.totalTaxes)}
        Net:\t\t\t${asCurrency(taxAssement.net)}
        Effective Rate:\t\t${asPercent(taxAssement.effectiveTaxRate)}
        `);
    } else {
        console.log(`${asCurrency(taxAssement.gross)}\t\t${asPercent(taxAssement.effectiveTaxRate)}`);
    }
}

    
