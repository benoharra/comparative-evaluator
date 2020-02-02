import { RowData } from './../sector-row-data';
import { CompanyProps } from './../data-mocker';
import { Constants } from './../../constants';

import { buildFactorRow, calculateCategoryWeight } from './inputDataUtils';
import { getLeverageKeys, getConfig } from '../../config';

export const buildLeverageMetrics = function(
    companyList: CompanyProps[],
    weights: Map<string, number>
) : RowData[] {
    let allLeverageRows: RowData[] = [{
        label: Constants.LEVERAGE,
        weight: calculateCategoryWeight(getLeverageKeys(), weights)
    }];
    const config = getConfig();
    allLeverageRows.push(
        buildFactorRow(companyList, weights,
            config.leverage.debtToEquity,
            (company) => company.leverage.debtToEquity));
    allLeverageRows.push(
        buildFactorRow(
            companyList,
            weights,
            config.leverage.interestCoverage,
            (company) => company.leverage.interestCoverage));

    return allLeverageRows;
}
