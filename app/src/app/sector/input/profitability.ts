import { RowData } from './../sector-row-data';
import { CompanyProps } from './../data-mocker';
import { Constants } from './../../constants';

import { buildFactorRow, calculateCategoryWeight } from './inputDataUtils';

export const buildProfitMetrics = function(
    companyList: CompanyProps[],
    weights: Map<string, number>
) : RowData[] {
    let allProfitRows: RowData[] = [{
        label: Constants.PROFITABILITY,
        weight: calculateCategoryWeight(Constants.PROFITABILITY_FACTORS, weights)
    }];
    allProfitRows.push(
        buildFactorRow(
            companyList, 
            weights, 
            Constants.GROSS_PROFIT, 
            (company) => company.profitability.grossProfitMargin));
    allProfitRows.push(
        buildFactorRow(
            companyList, 
            weights,
            Constants.NET_PROFIT,
            (company) => company.profitability.netProfitMargin));
    allProfitRows.push(
        buildFactorRow(
            companyList, 
            weights, 
            Constants.ROE, 
            (company) => company.profitability.returnOnEquity));
    allProfitRows.push(
        buildFactorRow(
            companyList, 
            weights,
            Constants.ROI,
            (company) => company.profitability.returnOnInvestment));

    return allProfitRows;
}
