import { RowData } from './../sector-row-data';
import { CompanyProps } from './../data-mocker';
import { Constants } from './../../constants';

export const buildLeverageMetrics = function(
    companyList: CompanyProps[]
) : RowData[] {
    let allLeverageRows: RowData[] = [{
        label: Constants.LEVERAGE,
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
        label: Constants.DEBT_TO_EQUITY,
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
        label: Constants.INTEREST_COVERAGE,
        weight: 5
    };
    companyList.forEach((company) => {
        interestCoverageRow[company.ticker] = company.leverage.interestCoverage;
    });
    return interestCoverageRow;
}