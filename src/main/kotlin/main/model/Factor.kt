package main.model

class Factor(val value: Float, val tolerancePercentage: Float = 0.05F, val sortedHighestToLowest: Boolean = true) {

    companion object {
        const val GROSS_PROFIT = "grossProfitMargin"
        const val NET_PROFIT = "netProfitMargin"
        const val ROE = "returnOnEquity"
        const val QUICK_RATIO = "quickRatio"
        const val CURRENT_RATIO = "currentRatio"
        const val DEBT_TO_EQUITY = "debtToEquity"
        const val INTEREST_COVERAGE = "interestCoverage"
        const val RECEIVABLE_TURNOVER = "receivableTurnover"
        const val INVENTORY_TURNOVER = "inventoryTurnover"
        const val ASSET_TURNOVER = "assetTurnover"
        const val FIVE_YEAR_SALES = "fiveYearSalesGrowth"
        const val ONE_YEAR_SALES = "oneYearSalesGrowth"
        const val FIVE_YEAR_EPS = "fiveYearEps"
        const val ONE_YEAR_EPS = "oneYearEps"
        const val PE = "priceOverEarnings"
    }

    fun compare(nextValue: Float): Boolean =
            if (sortedHighestToLowest) {
                (value - nextValue).div(value) > tolerancePercentage
            } else {
                (nextValue - value).div(nextValue) > tolerancePercentage
            }


}