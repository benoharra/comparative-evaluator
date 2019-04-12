package main.model.groups

import main.model.Factor

class Leverage (
        val debtToEquity: Float?,
        val interestCoverage: Float?
) {
    fun addAllFactors(factors: MutableMap<String, Factor>) {
        debtToEquity?.let{factors[Factor.DEBT_TO_EQUITY] = Factor(debtToEquity, tolerancePercentage = .1F, sortedHighestToLowest = false)}
        interestCoverage?.let{factors[Factor.INTEREST_COVERAGE] = Factor(interestCoverage, tolerancePercentage = .1F)}
    }
}