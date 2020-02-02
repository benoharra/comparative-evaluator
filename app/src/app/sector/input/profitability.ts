import { RowData } from './../sector-row-data';
import { CompanyProps } from './../data-mocker';
import { Constants } from './../../constants';

import { buildFactorRow, calculateCategoryWeight } from './inputDataUtils';
import { getConfig, getProfitabilityKeys } from '../../config';

export const buildProfitMetrics = function(
    companyList: CompanyProps[],
    weights: Map<string, number>
) : RowData[] {
    let allProfitRows: RowData[] = [{
        label: Constants.PROFITABILITY,
        weight: calculateCategoryWeight(getProfitabilityKeys(), weights)
    }];
    const config = getConfig();
    allProfitRows.push(
        buildFactorRow(
            companyList, 
            weights, 
            config.profitability.grossProfitMargin, 
            (company) => company.profitability.grossProfitMargin));
    allProfitRows.push(
        buildFactorRow(
            companyList, 
            weights,
            config.profitability.netProfitMargin,
            (company) => company.profitability.netProfitMargin));
    allProfitRows.push(
        buildFactorRow(
            companyList, 
            weights, 
            config.profitability.returnOnEquity, 
            (company) => company.profitability.returnOnEquity));
    allProfitRows.push(
        buildFactorRow(
            companyList, 
            weights,
            config.profitability.returnOnInvestment,
            (company) => company.profitability.returnOnInvestment));

    return allProfitRows;
}
