import { RowData } from './../sector-row-data';
import { CompanyProps } from './../data-mocker';
import { Constants } from './../../constants';

export const buildEfficiencyMetrics = function(
    companyList: CompanyProps[]
) : RowData[] {
    let allEfficiencyRows: RowData[] = [{
        label: Constants.EFFICIENCY,
        weight: 19
    }];
    allEfficiencyRows.push(receivableTurnover(companyList));
    allEfficiencyRows.push(assetTurnover(companyList));
    allEfficiencyRows.push(inventoryTurnover(companyList));

    return allEfficiencyRows;
}

const receivableTurnover = function(
    companyList: CompanyProps[]
) : RowData {
    let receivableTurnoverRow: RowData = {
        label: Constants.RECEIVABLES_TURN,
        weight: 5
    };
    companyList.forEach((company) => {
        receivableTurnoverRow[company.ticker] = company.efficiency.receivableTurnover;
    });
    return receivableTurnoverRow;
}

const assetTurnover = function(
    companyList: CompanyProps[]
) : RowData {
    let assetTurnoverRow: RowData = {
        label: Constants.ASSET_TURN,
        weight: 6
    };
    companyList.forEach((company) => {
        assetTurnoverRow[company.ticker] = company.efficiency.assetTurnover;
    });
    return assetTurnoverRow;
}

const inventoryTurnover = function(
    companyList: CompanyProps[]
) : RowData {
    let inventoryTurnoverRow: RowData = {
        label: Constants.INVENTORY_TURN,
        weight: 8
    };
    companyList.forEach((company) => {
        inventoryTurnoverRow[company.ticker] = company.efficiency.inventoryTurnover;
    });
    return inventoryTurnoverRow;
}

