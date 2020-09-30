import { RowData } from '../../sector-row-data';
import { CompanyProps } from '../../../dto/company-dtos';
import { Constants } from '../../../constants';

import { buildFactorRow, calculateCategoryWeight } from './inputDataUtils';
import { getConfig, getProfitabilityKeys } from '../../../config';

export const buildProfitMetrics = function(
    companyList: CompanyProps[],
    weights: Map<string, number>,
    updatedData: Map<string, Map<string, any>>
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
            updatedData,
            (company) => company.profitability.grossProfitMargin));
    allProfitRows.push(
        buildFactorRow(
            companyList, 
            weights,
            config.profitability.netProfitMargin,
            updatedData,
            (company) => company.profitability.netProfitMargin));
    allProfitRows.push(
        buildFactorRow(
            companyList, 
            weights, 
            config.profitability.returnOnEquity, 
            updatedData,
            (company) => company.profitability.returnOnEquity));
    allProfitRows.push(
        buildFactorRow(
            companyList, 
            weights,
            config.profitability.returnOnInvestment,
            updatedData,
            (company) => company.profitability.returnOnInvestment));

    return allProfitRows;
}
