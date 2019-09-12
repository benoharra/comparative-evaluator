package main.service

import main.controller.RankingsView
import main.model.*
import org.springframework.beans.factory.annotation.Autowired
import java.time.LocalDate

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

        return buildRankingsView(industryRanking)
    }

    private fun buildRankingsView(industryRanking: IndustryRanking) : RankingsView =
            RankingsView(
                    industryRanking.industryName,
                    industryRanking.dateUpdated,
                    industryRanking.ranking,
                    // Sort the rankings by highest buy rating and set the best buy to the highest recommended company
                    industryRanking.ranking
                            .sortedBy{it.recommendation.buyRating}.reversed()
                            [0].companyName
            )

}