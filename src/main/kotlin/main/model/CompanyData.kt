package main.model

import org.springframework.data.annotation.Id
import org.springframework.data.annotation.TypeAlias
import java.time.LocalDate

@TypeAlias("industry")
data class Industry(
        @Id val name: String,
        val dateAdded: LocalDate,
        val companies: List<Company>,
        val weights: Map<String, Float>
)

@TypeAlias("company")
data class Company(
        val name: String,
        @Id val ticker: String,
        val pe: Float,
        val profitability: Profitability?,
        val liquidity: Liquidity?,
        val leverage: Leverage?,
        val efficiency: Efficiency?,
        val growth: Growth?
)