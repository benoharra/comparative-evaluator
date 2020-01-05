import { RowData } from './../sector-row-data';
import { CompanyProps } from './../data-mocker';
import { Constants } from './../../constants';

import { buildFactorRow, calculateCategoryWeight } from './inputDataUtils';

export const buildLeverageMetrics = function(
    companyList: CompanyProps[],
    weights: Map<string, number>
) : RowData[] {
    let allLeverageRows: RowData[] = [{
        label: Constants.LEVERAGE,
        weight: calculateCategoryWeight(Constants.LEVERAGE_FACTORS, weights)
    }];
    allLeverageRows.push(
        buildFactorRow(companyList, weights,
            Constants.DEBT_TO_EQUITY,
            (company) => company.leverage.debtToEquity));
    allLeverageRows.push(
        buildFactorRow(
            companyList,
            weights,
            Constants.INTEREST_COVERAGE,
            (company) => company.leverage.interestCoverage));

    return allLeverageRows;
}
