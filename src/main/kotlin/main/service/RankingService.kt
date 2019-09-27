package main.service

import main.controller.CompanyName
import main.controller.RankingsView
import main.model.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service("rankingService")
class RankingService @Autowired constructor(
        private val industryService: IndustryService,
        private val rankingRepository: RankingRepository
) {

    fun performRanking(industry: Industry) : RankingsView {
        // Map the company factors to their tickers so the data is available for ranking
        val companyFactors: Map<String, Map<String, Factor>> = industry.companies.associateBy({it.ticker}, { mapAllFactors(it)})

        // Get the rankings for each company multiplied by weight
        val averageRankings: Map<String, Float> = calculateAverageRankings(industry.companies.map{it.ticker},
                                                                           industry.weights,
                                                                           companyFactors)
        // Calculate recommendations for each company
        val recommendations: Map<String, Recommendation> = calculateRecommendation(averageRankings,
                                                              industry.companies.map{it.ticker to it.pe}.toMap())

        // Build the Ranking objects for each company
        val rankings: List<Ranking> = buildRankingsResults(industry.companies, averageRankings, recommendations)

        // Build and save the IndustryRanking
        val industryRanking = IndustryRanking(
                industry.name,
                LocalDate.now(),
                rankings
        )
        // Save the ranking and industry data
        rankingRepository.save(industryRanking)
        industryService.submitAfterRanking(industry, recommendations)

        return industryRanking.toRankingView()
    }

    fun getIndustryRanking(industryName: String) : RankingsView? =
        rankingRepository.findById(industryName).orElse(null)
                ?.toRankingView()

    private fun IndustryRanking.toRankingView() : RankingsView =
            RankingsView(
                    this.industryName,
                    this.dateUpdated,
                    this.ranking,
                    // Sort the rankings by highest buy rating and set the best buy to the highest recommended company
                    this.ranking.filter{it.recommendation.buyRating >= 6.5F}
                            .maxBy{it.recommendation.buyRating}?.companyName
                            ?: noBuys
            )

    private val noBuys: CompanyName =
            CompanyName("None", "NA")

}