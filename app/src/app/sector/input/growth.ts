import { RowData } from './../sector-row-data';
import { CompanyProps } from './../data-mocker';
import { Constants } from './../../constants';

import { buildFactorRow, calculateCategoryWeight } from './inputDataUtils';

export const buildGrowthMetrics = function(
    companyList: CompanyProps[],
    weights: Map<string, number>
) : RowData[] {
    let allGrowthRows: RowData[] = [{
        label: Constants.GROWTH,
        weight: calculateCategoryWeight(Constants.GROWTH_FACTORS, weights)
    }];
    allGrowthRows.push(
        buildFactorRow(
            companyList,
            weights,
            Constants.FIVE_YR_REV,
            (company) => company.growth.fiveYearRev));
    allGrowthRows.push(
        buildFactorRow(
            companyList,
            weights,
            Constants.FIVE_YR_EPS,
            (company) => company.growth.fiveYearEps));
    allGrowthRows.push(
        buildFactorRow(
            companyList,
            weights,
            Constants.ONE_YR_REV,
            (company) => company.growth.oneYearRev));
    allGrowthRows.push(
        buildFactorRow(
            companyList,
            weights,
            Constants.ONE_YR_EPS,
            (company) => company.growth.oneYearEps));
    
    return allGrowthRows;
}
