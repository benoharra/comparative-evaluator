import { RowData } from './../sector-row-data';
import { CompanyProps } from './../data-mocker';

export const buildProfitMetrics = function(
    companyList: CompanyProps[]
) : RowData[] {
    let allProfitRows: RowData[] = [{
        label: "Profitability",
        weight: 24
    }];
    allProfitRows.push(grossProfit(companyList));
    allProfitRows.push(netProfit(companyList));
    allProfitRows.push(returnOnEquity(companyList));
    allProfitRows.push(returnOnInvestment(companyList));

    return allProfitRows;
}

const grossProfit = function(
    companyList: CompanyProps[]
) : RowData {
    let grossProfitRow: RowData = {
        label: "Gross Profit Margin",
        weight: 12
    };
    companyList.forEach((company) => {
        grossProfitRow[company.ticker] = company.profitability.grossProfitMargin;
    });
    return grossProfitRow;
}

const netProfit = function(
    companyList: CompanyProps[]
) : RowData {
    let netProfitRow: RowData = {
        label: "Net Profit Margin",
        weight: 4
    };
    companyList.forEach((company) => {
        netProfitRow[company.ticker] = company.profitability.netProfitMargin;
    });
    return netProfitRow;
}

const returnOnEquity = function(
    companyList: CompanyProps[]
) : RowData {
    let roeRow: RowData = {
        label: "Return on Equity",
        weight: 4
    };
    companyList.forEach((company) => {
        roeRow[company.ticker] = company.profitability.returnOnEquity;
    });
    return roeRow;
}

const returnOnInvestment = function(
    companyList: CompanyProps[]
) : RowData {
    let roiRow: RowData = {
        label: "Return on Investment",
        weight: 4
    };
    companyList.forEach((company) => {
        roiRow[company.ticker] = company.profitability.returnOnInvestment;
    });
    return roiRow;
}