import { RowData } from './../sector-row-data';
import { CompanyProps } from './../data-mocker';
import { Constants } from './../../constants';

import { buildFactorRow, calculateCategoryWeight } from './inputDataUtils';

export const buildLiquidityMetrics = function(
    companyList: CompanyProps[],
    weights: Map<string, number>
) : RowData[] {
    let allLiquidityRows: RowData[] = [{
        label: Constants.LIQUIDITY,
        weight: calculateCategoryWeight(Constants.LIQUIDITY_FACTORS, weights)
    }];
    allLiquidityRows.push(
        buildFactorRow(
            companyList, 
            weights,
            Constants.QUICK_RATIO,
            (company) => company.liquidity.quickRatio));
    allLiquidityRows.push(
        buildFactorRow(
            companyList, 
            weights,
            Constants.CURRENT_RATIO,
            (company) => company.liquidity.currentRatio));
    return allLiquidityRows;
}
