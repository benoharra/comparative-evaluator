package main.model

import main.controller.CompanyName
import org.springframework.data.annotation.Id
import org.springframework.data.annotation.TypeAlias
import java.time.LocalDate

@TypeAlias("Ranking")
data class IndustryRanking(
        @Id val industryName: String,
        val dateUpdated: LocalDate,
        val ranking: List<Ranking>
)

data class Ranking(
        val companyName: CompanyName,
        val averageRanking: Float,
        val pe: Float,
        val recommendation: Recommendation
)

data class Recommendation(
        val buyRating: Float,
        val action: String
)