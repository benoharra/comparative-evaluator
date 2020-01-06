import { RowData } from './../sector-row-data';
import { CompanyProps } from './../data-mocker';
import { Constants } from './../../constants';

import { buildFactorRow, calculateCategoryWeight } from './inputDataUtils';

export const buildEfficiencyMetrics = function(
    companyList: CompanyProps[],
    weights: Map<string, number>
) : RowData[] {
    let allEfficiencyRows: RowData[] = [{
        label: Constants.EFFICIENCY,
        weight: calculateCategoryWeight(Constants.EFFICIENCY_FACTORS, weights)
    }];
    allEfficiencyRows.push(
        buildFactorRow(
            companyList,
            weights,
            Constants.RECEIVABLES_TURN,
            (company) => company.efficiency.receivableTurnover));
    allEfficiencyRows.push(
        buildFactorRow(
            companyList,
            weights,
            Constants.ASSET_TURN,
            (company) => company.efficiency.assetTurnover));
    allEfficiencyRows.push(
        buildFactorRow(
            companyList,
            weights,
            Constants.INVENTORY_TURN,
            (company) => company.efficiency.inventoryTurnover));

    return allEfficiencyRows;
}
