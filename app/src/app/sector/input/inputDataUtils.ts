import { RowData } from './../sector-row-data';
import { CompanyProps } from './../data-mocker';

export const calculateCategoryWeight = function(
    categoryFactors: string[],
    weightMap: Map<string, number>): number {
    return categoryFactors
        .map(factor => weightMap.has(factor) ? weightMap.get(factor)! : 0)
        .reduce((sum, next) => sum + next);
}

export const buildFactorRow = function(
    companyList: CompanyProps[],
    weights: Map<string, number>,
    factor: string,
    selectValue: (company: CompanyProps) => number): RowData {
    let nextRow: RowData = {
        label: factor,
        weight: weights.get(factor) || 0
    }
    companyList.forEach((company) => {
        nextRow[company.ticker] = selectValue(company);
    })
    return nextRow;
}