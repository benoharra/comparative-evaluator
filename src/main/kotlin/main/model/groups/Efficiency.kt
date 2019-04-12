package main.model.groups

import main.model.Factor

class Efficiency (
        val receivableTurnover: Float?,
        val inventoryTurnover: Float?
) {

    fun addAllFactors(factors: MutableMap<String, Factor>) {
        receivableTurnover?.let{factors[Factor.RECEIVABLE_TURNOVER] = Factor(receivableTurnover)}
        inventoryTurnover?.let{factors[Factor.INVENTORY_TURNOVER] = Factor(inventoryTurnover)}
    }

}