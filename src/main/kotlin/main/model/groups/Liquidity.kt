package main.model.groups

import main.model.Factor

class Liquidity (val quickRatio: Float?,
                 val currentRatio: Float?) {

    fun addAllFactors(factors: MutableMap<String, Factor>) {
        quickRatio?.let{factors[Factor.QUICK_RATIO] = Factor(quickRatio)}
        currentRatio?.let{factors[Factor.CURRENT_RATIO] = Factor(currentRatio)}
    }
}