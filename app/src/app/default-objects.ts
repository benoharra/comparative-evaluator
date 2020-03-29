import weightData from './default-weights.json';

import { CompanyProps } from './dto/company-dtos';

const defaultWeights: {[key: string]: number} = (<{[key: string]: number}>weightData);

export const getDefaultWeights = (): Map<string, number> => {
    const weightMap = new Map<string, number>();
    Object.keys(defaultWeights).forEach(key => {
        weightMap.set(key, defaultWeights[key]);
    });
    return weightMap;
}

export const getBlankCompany = (index?: number): CompanyProps => {
   return  {
        name: index ? `New Company${index}` : "New Company",
        ticker: index ? `Blank${index}` : "Blank",
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
}