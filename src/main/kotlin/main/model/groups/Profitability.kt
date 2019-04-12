package main.model.groups

import main.model.Factor

class Profitability (
        val grossProfitMargin: Float?,
        val netProfitMargin: Float?,
        val returnOnEquity: Float?
) {
    fun addAllFactors(factors : MutableMap<String, Factor>) {
        grossProfitMargin?.let{factors[Factor.GROSS_PROFIT] = Factor(grossProfitMargin)}
        netProfitMargin?.let{factors[Factor.NET_PROFIT] = Factor(netProfitMargin)}
        returnOnEquity?.let{factors[Factor.ROE] = Factor(returnOnEquity)}
    }
}