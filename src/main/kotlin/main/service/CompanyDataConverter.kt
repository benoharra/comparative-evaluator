package main.service

import main.model.*

class CompanyDataConverter {

    fun mapAllFactors(company: Company) : Map<String, Factor> {
        val factors: MutableMap<String, Factor> = mutableMapOf()

        addProfitabilityFactors(company.profitability, factors)
        addLiquidityFactors(company.liquidity, factors)
        addLeverageFactors(company.leverage, factors)
        addEfficiencyFactors(company.efficiency, factors)
        addGrowthFactors(company.growth, factors)

        return factors
    }

    private fun addProfitabilityFactors(profitability: Profitability?, factors: MutableMap<String, Factor>) {
        profitability?.grossProfitMargin?.let{factors[Factor.GROSS_PROFIT] = Factor(profitability.grossProfitMargin)}
        profitability?.netProfitMargin?.let{factors[Factor.NET_PROFIT] = Factor(profitability.netProfitMargin)}
        profitability?.returnOnEquity?.let{factors[Factor.ROE] = Factor(profitability.returnOnEquity)}
    }

    private fun addLiquidityFactors(liquidity: Liquidity?, factors: MutableMap<String, Factor>) {
        liquidity.quickRatio?.let{factors[Factor.QUICK_RATIO] = Factor(liquidity.quickRatio)}
        liquidity.currentRatio?.let{factors[Factor.CURRENT_RATIO] = Factor(liquidity.currentRatio)}
    }

    private fun addLeverageFactors(leverage: Leverage?, factors: MutableMap<String, Factor>) {
        leverage.debtToEquity?.let{factors[Factor.DEBT_TO_EQUITY] = Factor(leverage.debtToEquity,
                                                                           tolerancePercentage = .1F,
                                                                           sortedHighestToLowest = false)}

        leverage.interestCoverage?.let{factors[Factor.INTEREST_COVERAGE] = Factor(leverage.interestCoverage,
                                                                                  tolerancePercentage = .1F)}
    }

    private fun addEfficiencyFactors(efficiency: Efficiency?, factors: MutableMap<String, Factor>) {
        efficiency?.receivableTurnover?.let { factors[Factor.RECEIVABLE_TURNOVER] = Factor(efficiency.receivableTurnover) }
        efficiency?.inventoryTurnover?.let { factors[Factor.INVENTORY_TURNOVER] = Factor(efficiency.inventoryTurnover) }
    }

    private fun addGrowthFactors(growth: Growth?, factors: MutableMap<String, Factor>) {
        growth?.fiveYearSales?.let{factors[Factor.FIVE_YEAR_SALES] = Factor(growth.fiveYearSales)}
        growth?.oneYearSales?.let{factors[Factor.ONE_YEAR_SALES] = Factor(growth.oneYearSales)}
        growth?.fiveYearEps?.let{factors[Factor.FIVE_YEAR_EPS] = Factor(growth.fiveYearEps)}
        growth?.oneYearEps?.let{factors[Factor.ONE_YEAR_EPS] = Factor(growth.oneYearEps)}
    }
}