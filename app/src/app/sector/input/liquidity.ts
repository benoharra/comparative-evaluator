import { RowData } from './../sector-row-data';
import { CompanyProps } from './../data-mocker';

export const buildLiquidityMetrics = function(
    companyList: CompanyProps[]
) : RowData[] {
    let allLiquidityRows: RowData[] = [{
        label: "Liquidity",
        weight: 10
    }];
    allLiquidityRows.push(quickRatio(companyList));
    allLiquidityRows.push(currentRatio(companyList));

    return allLiquidityRows;
}

const quickRatio = function(
    companyList: CompanyProps[]
) : RowData {
    let quickRatioRow: RowData = {
        label: "Quick Ratio",
        weight: 5
    };
    companyList.forEach((company) => {
        quickRatioRow[company.ticker] = company.liquidity.quickRatio;
    });
    return quickRatioRow;
}

const currentRatio = function(
    companyList: CompanyProps[]
) : RowData {
    let currentRatioRow: RowData = {
        label: "Current Ratio",
        weight: 5
    };
    companyList.forEach((company) => {
        currentRatioRow[company.ticker] = company.liquidity.currentRatio;
    });
    return currentRatioRow;
}