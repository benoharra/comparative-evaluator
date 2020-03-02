package main.model

data class Profitability (
        val grossProfitMargin: Float?,
        val netProfitMargin: Float?,
        val returnOnEquity: Float?
)

data class Liquidity (
        val quickRatio: Float?,
        val currentRatio: Float?
)

data class Leverage (
        val debtToEquity: Float?,
        val interestCoverage: Float?
)

data class Efficiency (
        val receivableTurnover: Float?,
        val inventoryTurnover: Float?,
        val assetTurnover: Float?
)

data class Growth (
        val fiveYearSales: Float?,
        val oneYearSales: Float?,
        val fiveYearEps: Float?,
        val oneYearEps: Float?
)