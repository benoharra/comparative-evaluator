import { CompanyProps } from './data-mocker';
import { buildProfitMetrics } from './input/profitability';
import { buildLiquidityMetrics } from './input/liquidity';
import { buildLeverageMetrics } from './input/leverage';
import { buildEfficiencyMetrics } from './input/efficiency';
import { buildGrowthMetrics } from './input/growth';

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
    let rowData: RowData[] = buildProfitMetrics(companyList, weights, updatedData);
    rowData = rowData.concat(
        buildLiquidityMetrics(companyList, weights, updatedData),
        buildLeverageMetrics(companyList, weights, updatedData),
        buildEfficiencyMetrics(companyList, weights, updatedData),
        buildGrowthMetrics(companyList, weights, updatedData));

    return rowData;
}