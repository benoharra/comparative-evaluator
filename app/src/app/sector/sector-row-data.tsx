import * as React from 'react';

import { FunctionComponent, ReactNode} from 'react';

import { CompanyProps } from './data-mocker';
import { buildProfitMetrics } from './input/profitability';
import { buildLiquidityMetrics } from './input/liquidity';
import { buildLeverageMetrics } from './input/leverage';
import { buildEfficiencyMetrics } from './input/efficiency';
import { buildGrowthMetrics } from './input/growth';


export interface RowData {
    label: string,
    weight: string,
    [key: string]: any
}

export const buildSectorRowData = function(
    companyList: CompanyProps[]
): RowData[] {
    let rowData: RowData[] = buildProfitMetrics(companyList);
    rowData = rowData.concat(
        buildLiquidityMetrics(companyList),
        buildLeverageMetrics(companyList),
        buildEfficiencyMetrics(companyList),
        buildGrowthMetrics(companyList)
        );

    return rowData;
}