import { Constants } from '../constants';
import { CompanyProps } from '../dto/company-dtos';

interface Profitability {
    grossProfitMargin: number;
    netProfitMargin: number;
    returnOnEquity: number;
    returnOnInvestment: number;
}

interface Liquidity {
    quickRatio: number;
    currentRatio: number;
}

interface Leverage {
    debtToEquity: number;
    interestCoverage: number;
}

interface Growth {
    oneYearRev: number;
    oneYearEps: number;
    fiveYearRev: number;
    fiveYearEps: number;
}

interface Efficiency {
    receivableTurnover: number;
    inventoryTurnover: number;
    assetTurnover: number;
}

export interface IndustryProps {
    name: string,
    companies: string[],
    dateUpdated: string
}

export const testIndustries: IndustryProps[] = [
    {
        name: "Industry1",
        companies: ["Comp1", "Comp2", "Comp3"],
        dateUpdated: new Date().toDateString()
    },
    {
        name: "Industry2",
        companies: ["Comp1", "Comp2", "Comp3", "Comp4"],
        dateUpdated: new Date().toDateString()
    },
    {
        name: "Industry3",
        companies: ["Comp1", "Comp2", "Comp3"],
        dateUpdated: new Date().toDateString()
    },
]
    

export const blankCompany: CompanyProps =
    {
        name: "New Company",
        ticker: "Blank",
        pe: 0,
        profitability: {
            grossProfitMargin: 0,
            netProfitMargin: 0,
            returnOnEquity: 0,
            returnOnInvestment: 0
        },
        liquidity: {
            quickRatio: 0,
            currentRatio: 0
        },
        leverage: {
            debtToEquity: 0,
            interestCoverage: 0
        },
        growth: {
            oneYearEps: 0,
            oneYearRev: 0,
            fiveYearEps: 0,
            fiveYearRev: 0
        },
        efficiency: {
            receivableTurnover: 0,
            assetTurnover: 0,
            inventoryTurnover: 0
        }
    };

export const defaultWeights: Map<string, number> = 
    new Map([
        [Constants.GROSS_PROFIT, 12],
        [Constants.NET_PROFIT, 12],
        [Constants.ROE, 6],
        [Constants.ROI, 6],
        [Constants.QUICK_RATIO, 6],
        [Constants.CURRENT_RATIO, 6],
        [Constants.DEBT_TO_EQUITY, 6],
        [Constants.INTEREST_COVERAGE, 6],
        [Constants.RECEIVABLES_TURN, 6],
        [Constants.ASSET_TURN, 6],
        [Constants.INVENTORY_TURN, 6],
        [Constants.FIVE_YR_REV, 10],
        [Constants.FIVE_YR_EPS, 5],
        [Constants.ONE_YR_REV, 10],
        [Constants.ONE_YR_EPS, 5]
    ]);

export const testCompanies: CompanyProps[] = [
    {
        name: "Test1",
        ticker: "T1",
        pe: 25,
        profitability: {
            grossProfitMargin: 77.7,
            netProfitMargin: 12.5,
            returnOnEquity: 10.0,
            returnOnInvestment: 1.0
        },
        liquidity: {
            quickRatio: 1.1,
            currentRatio: 1.2
        },
        leverage: {
            debtToEquity: 0.5,
            interestCoverage: 22
        },
        growth: {
            oneYearEps: 5.0,
            oneYearRev: 10.1,
            fiveYearEps: 2.2,
            fiveYearRev: 5.2
        },
        efficiency: {
            receivableTurnover: 2.3,
            assetTurnover: 0.5,
            inventoryTurnover: 1.2
        }
    },
    {
        name: "Test2",
        ticker: "T2",
        pe: 30,
        profitability: {
            grossProfitMargin: 87.7,
            netProfitMargin: 22.5,
            returnOnEquity: 20.0,
            returnOnInvestment: 10.0
        },
        liquidity: {
            quickRatio: 2.1,
            currentRatio: 2.2
        },
        leverage: {
            debtToEquity: 0.25,
            interestCoverage: 25
        },
        growth: {
            oneYearEps: 10.0,
            oneYearRev: 20.1,
            fiveYearEps: 5.2,
            fiveYearRev: 10.2
        },
        efficiency: {
            receivableTurnover: 2.3,
            assetTurnover: 0.5,
            inventoryTurnover: 1.2
        }
    }
];