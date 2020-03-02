import { RowData } from './../sector-row-data';
import { CompanyProps } from './../../dto/company-dtos';
import { FactorConfig } from '../../config';

export const calculateCategoryWeight = function(
    categoryFactors: string[],
    weightMap: Map<string, number>): number {
    const total = categoryFactors
        .map(factor => weightMap.has(factor) ? weightMap.get(factor)! : 0)
        .reduce((sum, next) => sum + next);
    return total;
}

export const buildFactorRow = function(
    companyList: CompanyProps[],
    weights: Map<string, number>,
    factor: FactorConfig,
    updatedDataPoints: Map<string, Map<string, any>>,
    selectValue: (company: CompanyProps) => number): RowData {
    let nextRow: RowData = {
        label: factor.display,
        weight: weights.get(factor.key) || 0
    }
    companyList.forEach((company) => {
        const updatedValue = updatedDataPoints.has(factor.display) ? 
            updatedDataPoints.get(factor.display)!.get(company.ticker) : undefined;
        nextRow[company.ticker] = updatedValue ?
            updatedValue 
            : selectValue(company);
    })
    return nextRow;
}