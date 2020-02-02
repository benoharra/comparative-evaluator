import { RowData } from './../sector-row-data';
import { CompanyProps } from './../data-mocker';
import { Constants } from './../../constants';

import { buildFactorRow, calculateCategoryWeight } from './inputDataUtils';
import { getLiquidityKeys, getConfig } from '../../config';

export const buildLiquidityMetrics = function(
    companyList: CompanyProps[],
    weights: Map<string, number>
) : RowData[] {
    let allLiquidityRows: RowData[] = [{
        label: Constants.LIQUIDITY,
        weight: calculateCategoryWeight(getLiquidityKeys(), weights)
    }];
    const config = getConfig();
    allLiquidityRows.push(
        buildFactorRow(
            companyList, 
            weights,
            config.liquidity.quickRatio,
            (company) => company.liquidity.quickRatio));
    allLiquidityRows.push(
        buildFactorRow(
            companyList, 
            weights,
            config.liquidity.currentRatio,
            (company) => company.liquidity.currentRatio));
    return allLiquidityRows;
}
