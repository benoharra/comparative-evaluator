
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

export interface CompanyProps {
    name: string,
    ticker: string,
    profitability: Profitability;
    liquidity: Liquidity;
    leverage: Leverage;
    growth: Growth;
    efficiency: Efficiency;
}

// Ranking and display dtos
export interface CompanyName {
    name: string,
    ticker: string
}

export interface CompanyInfo {
    companyName: CompanyName,
    industries: string[]
}

export interface Recommendation {
    buyRating: number,
    action: string
}

export interface Ranking {
    companyName: CompanyName,
    averageRanking: number,
    pe: number,
    recommendation: Recommendation
}

export interface CompanyView {
    name: CompanyName,
    dateUpdated: string,
    industries: string[],
    data: CompanyProps
}