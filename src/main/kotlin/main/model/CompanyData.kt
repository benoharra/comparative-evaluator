package main.model

import org.springframework.data.annotation.Id
import org.springframework.data.annotation.TypeAlias
import java.time.LocalDate
import java.util.*

@TypeAlias("industry")
data class Industry(
        @Id val name: String,
        val dateUpdated: LocalDate,
        val companies: List<Company>,
        val weights: Map<String, Float>
)

@TypeAlias("analysis")
data class IndustryAnalysis(
        @Id val id: UUID,
        val name: String,
        val dateUpdated: LocalDate,
        val companies: List<Company>,
        val weights: Map<String, Float>
)

@TypeAlias("company")
data class CompanyAnalysis(
        @Id val ticker: String,
        val dateUpdated: LocalDate,
        val industries: MutableSet<String>,
        val companyInfo: Company,
        val analyses: MutableSet<UUID>,
        val recommendation: Recommendation? = null
)


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

