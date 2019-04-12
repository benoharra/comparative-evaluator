package main.model.groups

import main.model.Factor

class Growth (
        val fiveYearSales: Float?,
        val oneYearSales: Float?,
        val fiveYearEps: Float?,
        val oneYearEps: Float?
) {

    fun addAllFactors(factors: MutableMap<String, Factor>) {
        fiveYearSales?.let{factors[Factor.FIVE_YEAR_SALES] = Factor(fiveYearSales)}
        oneYearSales?.let{factors[Factor.ONE_YEAR_SALES] = Factor(oneYearSales)}
        fiveYearEps?.let{factors[Factor.FIVE_YEAR_EPS] = Factor(fiveYearEps)}
        oneYearEps?.let{factors[Factor.ONE_YEAR_EPS] = Factor(oneYearEps)}
    }

}