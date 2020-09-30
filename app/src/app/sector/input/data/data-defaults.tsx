import { Constants } from '../../../constants';
import { CompanyProps } from '../../../dto/company-dtos';
    
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