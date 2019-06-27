import { RowData } from './../sector-row-data';
import { CompanyProps } from './../data-mocker';

export const buildLeverageMetrics = function(
    companyList: CompanyProps[]
) : RowData[] {
    let allLeverageRows: RowData[] = [{
        label: "Leverage",
        weight: 11
    }];
    allLeverageRows.push(debtToEquity(companyList));
    allLeverageRows.push(interestCoverage(companyList));

    return allLeverageRows;
}

const debtToEquity = function(
    companyList: CompanyProps[]
) : RowData {
    let debtToEquityRow: RowData = {
        label: "Debt to Equity",
        weight: 6
    };
    companyList.forEach((company) => {
        debtToEquityRow[company.ticker] = company.leverage.debtToEquity;
    });
    return debtToEquityRow;
}

const interestCoverage = function(
    companyList: CompanyProps[]
) : RowData {
    let interestCoverageRow: RowData = {
        label: "Interest Coverage",
        weight: 5
    };
    companyList.forEach((company) => {
        interestCoverageRow[company.ticker] = company.leverage.interestCoverage;
    });
    return interestCoverageRow;
}