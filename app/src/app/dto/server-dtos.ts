// Base Company groups
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
// Base Company and Industry
export interface CompanyProps {
    name: string,
    ticker: string,
    profitability: Profitability;
    liquidity: Liquidity;
    leverage: Leverage;
    growth: Growth;
    efficiency: Efficiency;
}

export interface CompanyInfo {
    companyName: {
        name: string,
        ticker: string
    },
    industries: string[]
}

export interface IndustryProps {
    name: string,
    companies: CompanyProps[],
    dateUpdated: string,
    weights: Map<string, number>
}
