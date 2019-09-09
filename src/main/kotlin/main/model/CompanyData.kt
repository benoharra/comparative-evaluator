package main.model

import java.time.LocalDate

data class Industry(
        val name: String,
        val dateAdded: LocalDate,
        val companies: List<Company>
)

data class Company(
        val name: String,
        val pe: Float,
        val profitability: Profitability?,
        val liquidity: Liquidity?,
        val leverage: Leverage?,
        val efficiency: Efficiency?,
        val growth: Growth?
)