import data from './factor-constants.json';

import { Constants } from './constants';

const config: Config = (<Config>data);

export const getConfig = (): Config => {
    return config;
}

export const getFactorKeyFromName = (factorName: string): string => {
    switch(factorName) {
        case Constants.GROSS_PROFIT:
            return config.profitability.grossProfitMargin.key;
        case Constants.NET_PROFIT:
            return config.profitability.netProfitMargin.key;
        case Constants.ROE:
            return config.profitability.returnOnEquity.key;
        case Constants.ROI:
            return config.profitability.returnOnInvestment.key;
        case Constants.QUICK_RATIO:
            return config.liquidity.quickRatio.key;
        case Constants.CURRENT_RATIO:
            return config.liquidity.currentRatio.key;
        case Constants.DEBT_TO_EQUITY:
            return config.leverage.debtToEquity.key;
        case Constants.INTEREST_COVERAGE:
            return config.leverage.interestCoverage.key;
        case Constants.RECEIVABLES_TURN:
            return config.efficiency.receivablesTurnover.key;
        case Constants.ASSET_TURN:
            return config.efficiency.assetTurnover.key;
        case Constants.INVENTORY_TURN:
            return config.efficiency.inventoryTurnover.key;
        case Constants.FIVE_YR_REV:
            return config.growth.fiveYearRevenue.key;
        case Constants.FIVE_YR_EPS:
            return config.growth.fiveYearEps.key;
        case Constants.ONE_YR_REV:
            return config.growth.oneYearRevenue.key;
        case Constants.ONE_YR_EPS:
            return config.growth.oneYearEps.key;
        case Constants.PE:
            return "pe";
        default: 
            return "";
    }
}

export const getFactorKeys = (): string[] => {
    const keys: string[] = [];
    keys.push(...getProfitabilityKeys());
    keys.push(...getLiquidityKeys());
    keys.push(...getLeverageKeys());
    keys.push(...getEfficiencyKeys());
    keys.push(...getGrowthKeys());
    return keys;
}

export const getProfitabilityKeys = (): string[] => {
    const keys: string[] = [];
    keys.push(config.profitability.grossProfitMargin.key);
    keys.push(config.profitability.netProfitMargin.key);
    keys.push(config.profitability.returnOnEquity.key);
    keys.push(config.profitability.returnOnInvestment.key);
    
    return keys;
}

export const getLiquidityKeys = (): string[] => {
    const keys: string[] = [];
    keys.push(config.liquidity.quickRatio.key);
    keys.push(config.liquidity.currentRatio.key);
    return keys;
}

export const getLeverageKeys = (): string[] => {
    const keys: string[] = [];
    keys.push(config.leverage.debtToEquity.key);
    keys.push(config.leverage.interestCoverage.key);
    return keys;
}

export const getEfficiencyKeys = (): string[] => {
    const keys: string[] = [];
    keys.push(config.efficiency.receivablesTurnover.key);
    keys.push(config.efficiency.assetTurnover.key);
    keys.push(config.efficiency.inventoryTurnover.key);
    return keys;
}
export const getGrowthKeys = (): string[] => {
    const keys: string[] = [];
    keys.push(config.growth.fiveYearRevenue.key);
    keys.push(config.growth.oneYearRevenue.key);
    keys.push(config.growth.fiveYearEps.key);
    keys.push(config.growth.oneYearEps.key);
    return keys;
}

export interface Config {
    profitability: {
        grossProfitMargin: FactorConfig,
        netProfitMargin: FactorConfig,
        returnOnEquity: FactorConfig,
        returnOnInvestment: FactorConfig
    },
    liquidity: {
        quickRatio: FactorConfig,
        currentRatio: FactorConfig
    },
    leverage: {
        debtToEquity: FactorConfig,
        interestCoverage: FactorConfig
    },
    efficiency: {
        receivablesTurnover: FactorConfig,
        assetTurnover: FactorConfig,
        inventoryTurnover: FactorConfig
    },
    growth: {
        fiveYearRevenue: FactorConfig,
        oneYearRevenue: FactorConfig,
        fiveYearEps: FactorConfig,
        oneYearEps: FactorConfig
    }
}

export interface FactorConfig {
    type: string,
    display: string,
    key: string
}