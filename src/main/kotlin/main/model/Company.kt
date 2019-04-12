package main.model

import main.model.groups.*

class Company(
        val name: String,
        val profitability: Profitability?,
        val liquidity: Liquidity?,
        val leverage: Leverage?,
        val efficiency: Efficiency?,
        val growth: Growth?
) {
    fun getCompanyFactors() : Map<String, Factor> {
        val factors: MutableMap<String, Factor> = mutableMapOf()

        profitability?.addAllFactors(factors)
        liquidity?.addAllFactors(factors)
        leverage?.addAllFactors(factors)
        efficiency?.addAllFactors(factors)
        growth?.addAllFactors(factors)
        return factors
    }
}