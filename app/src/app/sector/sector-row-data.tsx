import * as React from 'react';

import { FunctionComponent, ReactNode} from 'react';

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
    weights: Map<string, number>
): RowData[] {
    let rowData: RowData[] = buildProfitMetrics(companyList, weights);
    rowData = rowData.concat(
        buildLiquidityMetrics(companyList, weights),
        buildLeverageMetrics(companyList, weights),
        buildEfficiencyMetrics(companyList, weights),
        buildGrowthMetrics(companyList, weights));

    return rowData;
}