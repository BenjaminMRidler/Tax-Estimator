class TaxScheduleItem {

    readonly bracket: number;
    readonly rate: number;

    constructor(bracket: number, rate: number) {
        this.bracket = bracket;
        this.rate = rate;
    }
}

class FederalTaxSchedule {

    readonly schedule: TaxScheduleItem[];

    constructor() {
        this.schedule = [
            new TaxScheduleItem(23200, .10), 
            new TaxScheduleItem(94300, .12), 
            new TaxScheduleItem(303900, .22), 
            new TaxScheduleItem(487450, .24), 
        ];
    }
}

class StateTaxSchedule {

    readonly schedule: TaxScheduleItem[];

    constructor() {
        this.schedule = [
            new TaxScheduleItem(17150, .04), 
            new TaxScheduleItem(23600, .045), 
            new TaxScheduleItem(27900, .055), 
            new TaxScheduleItem(161500, .06), 
            new TaxScheduleItem(323200, .0685),
            new TaxScheduleItem(2155350, .0965),
        ];
    }
}
class TaxAssessment {

    // brackets
    readonly federalBrackets: FederalTaxSchedule = new FederalTaxSchedule();
    readonly stateBrackets: StateTaxSchedule = new StateTaxSchedule();

    // Social Security
    readonly socialSecurityLimit: number = 168600;
    readonly socialSecurityTaxRate: number = 0.062;

    // Medicare
    readonly medicareStandardLimit: number = 250000;
    readonly medicareTaxRate: number = 0.0145;
    readonly additionalMedicareTaxRate: number = 0.0145;

    // Federal
    readonly standardDeduction: number = 29200;
    readonly dependentDeduction: number = 2000;

    // parameters
    readonly numberOfDependents;
    readonly gross: number;

    // calculated values
    private _additionalMedicare?: number = undefined;
    private _agi?: number = undefined;
    private _effectiveTaxRate?: number = undefined;
    private _federal?: number = undefined;
    private _medicare?: number = undefined;
    private _net?: number = undefined;
    private _socialSecurity?: number = undefined;
    private _state?: number = undefined;
    private _totalTaxes?: number = undefined;

    get additionalMedicare(): number {
        if(this._additionalMedicare === undefined) {
            this.calculateMedicare();
        }
        return this._additionalMedicare ?? 0;
    }

    get agi(): number {
        if(this._agi === undefined) {
            this.calculateAgi();
        }

        return this._agi??0;
    }

    get effectiveTaxRate(): number {
        if(this._effectiveTaxRate === undefined) {
            this.calculateEffectiveTaxRate();
        }
        return this._effectiveTaxRate ?? 0;
    }

    get federal(): number {
        if(this._federal === undefined) {
            this.calculateFederal();
        }
        return this._federal ?? 0;
    }   

    get medicare(): number {
        if(this._medicare === undefined) {
            this.calculateMedicare();
        }
        return this._medicare ?? 0;
    }   

    get net(): number {
        if(this._net === undefined) {
            this.caclulateNet();
        }   
        return this._net ?? 0;
    }   

    get socialSecurity(): number {
        if(this._socialSecurity === undefined) {
            this.calculateSocialSecurity();
        }

        return this._socialSecurity ?? 0;
    }

    get state(): number {
        if(this._state === undefined) {
            this.calculateState();
        }
        return this._state ?? 0;
    }   

    get totalTaxes(): number {
        if(this._totalTaxes === undefined) {
            this.caclulateTotalTaxes();
        }
        return this._totalTaxes ?? 0;
    }

    constructor(gross: number, numberOfDependents: number) {
        this.gross = gross;
        this.numberOfDependents = numberOfDependents;
    }

    calculateAgi = () => {
        let agi = this.gross - this.standardDeduction - this.dependentDeduction * this.numberOfDependents - this.socialSecurity - this.medicare - this.additionalMedicare;
        this._agi = agi > 0 ? agi : 0;
    }

    calculateEffectiveTaxRate = () => {
        this._effectiveTaxRate = this.totalTaxes > 0 ? this.totalTaxes / this.gross : 0;
    }

    calculateFederal = () => {
        let agi = this.agi;
        let tax = 0;
        for (const item of this.federalBrackets.schedule) {
            const bracket = item.bracket;
            let taxableAmount = agi > bracket ? bracket : agi;
            tax += taxableAmount * item.rate;
            agi -= taxableAmount;
            if (agi <= 0) {
                break;
            }   
        }
        this._federal = tax;
    }

    calculateMedicare = () => {
        this._medicare= (this.gross > this.medicareStandardLimit ? this.medicareStandardLimit : this.gross) * this.medicareTaxRate;
        this._additionalMedicare = (this.gross > this.medicareStandardLimit ? this.gross - this.medicareStandardLimit : 0) * this.additionalMedicareTaxRate;    
    }

    caclulateNet() {
        this._net = this.gross - this.totalTaxes
    }

    calculateSocialSecurity = () => {
        this._socialSecurity = (this.gross > this.socialSecurityLimit ? this.socialSecurityLimit : this.gross) * this.socialSecurityTaxRate;
    }

    calculateState = () => {
        let agi = this.agi;
        let tax = 0;
        for (const item of this.stateBrackets.schedule) {
            const bracket = item.bracket;
            let taxableAmount = agi > bracket ? bracket : agi;
            tax += taxableAmount * item.rate;
            agi -= taxableAmount;
            if (agi <= 0) {
                break;
            }   
        }
        this._state = tax;
    }

    caclulateTotalTaxes() {
        this._totalTaxes = this.federal + this.state + this.socialSecurity + this.medicare;
    }

}

export { TaxAssessment };