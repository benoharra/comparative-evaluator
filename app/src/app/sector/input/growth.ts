import { RowData } from './../sector-row-data';
import { CompanyProps } from './../data-mocker';

export const buildGrowthMetrics = function(
    companyList: CompanyProps[]
) : RowData[] {
    let allGrowthRows: RowData[] = [{
        label: "Growth",
        weight: 36
    }];
    allGrowthRows.push(fiveYearRev(companyList));
    allGrowthRows.push(fiveYearEps(companyList));
    allGrowthRows.push(oneYearRev(companyList));
    allGrowthRows.push(oneYearEps(companyList));
    
    return allGrowthRows;
}

const fiveYearRev = function(
    companyList: CompanyProps[]
) : RowData {
    let fiveYearRevRow: RowData = {
        label: "5 yr. Revenue Growth",
        weight: 6
    };
    companyList.forEach((company) => {
        fiveYearRevRow[company.ticker] = company.growth.fiveYearRev;
    });
    return fiveYearRevRow;
}

const fiveYearEps = function(
    companyList: CompanyProps[]
) : RowData {
    let fiveYearEpsRow: RowData = {
        label: "5 yr. EPS Growth",
        weight: 6
    };
    companyList.forEach((company) => {
        fiveYearEpsRow[company.ticker] = company.growth.fiveYearEps;
    });
    return fiveYearEpsRow;
}

const oneYearRev = function(
    companyList: CompanyProps[]
) : RowData {
    let oneYearRevRow: RowData = {
        label: "1 yr. Revenue Growth",
        weight: 12
    };
    companyList.forEach((company) => {
        oneYearRevRow[company.ticker] = company.growth.oneYearRev;
    });
    return oneYearRevRow;
}

const oneYearEps = function(
    companyList: CompanyProps[]
) : RowData {
    let oneYearEpsRow: RowData = {
        label: "1 yr. EPS Growth",
        weight: 12
    };
    companyList.forEach((company) => {
        oneYearEpsRow[company.ticker] = company.growth.oneYearEps;
    });
    return oneYearEpsRow;
}