import { CompanyProps } from './../dto/company-dtos';
import { buildProfitMetrics } from './input/data/profitability';
import { buildLiquidityMetrics } from './input/data/liquidity';
import { buildLeverageMetrics } from './input/data/leverage';
import { buildEfficiencyMetrics } from './input/data/efficiency';
import { buildGrowthMetrics } from './input/data/growth';
import { Constants } from '../constants';

export interface RowData {
    label: string;
    weight: number;
    [key: string]: any;
}

export const buildSectorRowData = function(
    companyList: CompanyProps[],
    weights: Map<string, number>,
    updatedData: Map<string, Map<string, any>>
): RowData[] {
    let rowData: RowData[] = [];

    let peRow: RowData = {
        label: Constants.PE,
        weight: 0
    }
    companyList.forEach(company => {
        const updatedValue = updatedData.has(Constants.PE) ?
            updatedData.get(Constants.PE)!.get(company.ticker) : undefined;
        
        peRow[company.ticker] = updatedValue ? updatedData 
            : company.pe ? company.pe : 0;
    });
    rowData = rowData.concat(peRow);

    rowData = rowData.concat(
        buildProfitMetrics(companyList, weights, updatedData),
        buildLiquidityMetrics(companyList, weights, updatedData),
        buildLeverageMetrics(companyList, weights, updatedData),
        buildEfficiencyMetrics(companyList, weights, updatedData),
        buildGrowthMetrics(companyList, weights, updatedData));

    return rowData;
}