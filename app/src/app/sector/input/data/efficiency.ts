import { RowData } from '../../sector-row-data';
import { CompanyProps } from '../../../dto/company-dtos';
import { Constants } from '../../../constants';

import { buildFactorRow, calculateCategoryWeight } from './inputDataUtils';
import { getConfig, getEfficiencyKeys } from '../../../config';

export const buildEfficiencyMetrics = function(
    companyList: CompanyProps[],
    weights: Map<string, number>,
    updatedData: Map<string, Map<string, any>>
) : RowData[] {
    let allEfficiencyRows: RowData[] = [{
        label: Constants.EFFICIENCY,
        weight: calculateCategoryWeight(getEfficiencyKeys(), weights)
    }];
    const config = getConfig();
    allEfficiencyRows.push(
        buildFactorRow(
            companyList,
            weights,
            config.efficiency.receivablesTurnover,
            updatedData,
            (company) => company.efficiency.receivableTurnover));
    allEfficiencyRows.push(
        buildFactorRow(
            companyList,
            weights,
            config.efficiency.assetTurnover,
            updatedData,
            (company) => company.efficiency.assetTurnover));
    allEfficiencyRows.push(
        buildFactorRow(
            companyList,
            weights,
            config.efficiency.inventoryTurnover,
            updatedData,
            (company) => company.efficiency.inventoryTurnover));

    return allEfficiencyRows;
}
