import { RowData } from './../sector-row-data';
import { CompanyProps } from './../data-mocker';
import { Constants } from './../../constants';

import { buildFactorRow, calculateCategoryWeight } from './inputDataUtils';
import { getConfig, getGrowthKeys } from '../../config';

export const buildGrowthMetrics = function(
    companyList: CompanyProps[],
    weights: Map<string, number>
) : RowData[] {
    let allGrowthRows: RowData[] = [{
        label: Constants.GROWTH,
        weight: calculateCategoryWeight(getGrowthKeys(), weights)
    }];
    const config = getConfig();
    allGrowthRows.push(
        buildFactorRow(
            companyList,
            weights,
            config.growth.fiveYearRevenue,
            (company) => company.growth.fiveYearRev));
    allGrowthRows.push(
        buildFactorRow(
            companyList,
            weights,
            config.growth.fiveYearEps,
            (company) => company.growth.fiveYearEps));
    allGrowthRows.push(
        buildFactorRow(
            companyList,
            weights,
            config.growth.oneYearRevenue,
            (company) => company.growth.oneYearRev));
    allGrowthRows.push(
        buildFactorRow(
            companyList,
            weights,
            config.growth.oneYearEps,
            (company) => company.growth.oneYearEps));
    
    return allGrowthRows;
}
