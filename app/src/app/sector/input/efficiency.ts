import { RowData } from './../sector-row-data';
import { CompanyProps } from './../data-mocker';
import { Constants } from './../../constants';

import { buildFactorRow, calculateCategoryWeight } from './inputDataUtils';
import { getConfig, getEfficiencyKeys } from '../../config';

export const buildEfficiencyMetrics = function(
    companyList: CompanyProps[],
    weights: Map<string, number>
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
            (company) => company.efficiency.receivableTurnover));
    allEfficiencyRows.push(
        buildFactorRow(
            companyList,
            weights,
            config.efficiency.assetTurnover,
            (company) => company.efficiency.assetTurnover));
    allEfficiencyRows.push(
        buildFactorRow(
            companyList,
            weights,
            config.efficiency.inventoryTurnover,
            (company) => company.efficiency.inventoryTurnover));

    return allEfficiencyRows;
}
