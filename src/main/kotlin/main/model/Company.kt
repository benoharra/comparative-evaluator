package main.model

import main.model.groups.*

data class Company(
        val name: String,
        val profitability: Profitability?,
        val liquidity: Liquidity?,
        val leverage: Leverage?,
        val efficiency: Efficiency?,
        val growth: Growth?
)