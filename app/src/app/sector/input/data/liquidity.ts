import { RowData } from '../../sector-row-data';
import { CompanyProps } from '../../../dto/company-dtos';
import { Constants } from '../../../constants';

import { buildFactorRow, calculateCategoryWeight } from './inputDataUtils';
import { getLiquidityKeys, getConfig } from '../../../config';

export const buildLiquidityMetrics = function(
    companyList: CompanyProps[],
    weights: Map<string, number>,
    updatedData: Map<string, Map<string, any>>
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
            updatedData,
            (company) => company.liquidity.quickRatio));
    allLiquidityRows.push(
        buildFactorRow(
            companyList, 
            weights,
            config.liquidity.currentRatio,
            updatedData,
            (company) => company.liquidity.currentRatio));
    return allLiquidityRows;
}
