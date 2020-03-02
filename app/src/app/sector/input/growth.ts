import { RowData } from './../sector-row-data';
import { CompanyProps } from './../../dto/company-dtos';
import { Constants } from './../../constants';

import { buildFactorRow, calculateCategoryWeight } from './inputDataUtils';
import { getConfig, getGrowthKeys } from '../../config';

export const buildGrowthMetrics = function(
    companyList: CompanyProps[],
    weights: Map<string, number>,
    updatedData: Map<string, Map<string, any>>
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
            updatedData,
            (company) => company.growth.fiveYearRev));
    allGrowthRows.push(
        buildFactorRow(
            companyList,
            weights,
            config.growth.fiveYearEps,
            updatedData,
            (company) => company.growth.fiveYearEps));
    allGrowthRows.push(
        buildFactorRow(
            companyList,
            weights,
            config.growth.oneYearRevenue,
            updatedData,
            (company) => company.growth.oneYearRev));
    allGrowthRows.push(
        buildFactorRow(
            companyList,
            weights,
            config.growth.oneYearEps,
            updatedData,
            (company) => company.growth.oneYearEps));
    
    return allGrowthRows;
}
