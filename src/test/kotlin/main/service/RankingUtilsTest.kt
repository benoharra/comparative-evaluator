package main.service

import main.controller.CompanyName
import main.model.Company
import main.model.Factor
import main.model.Ranking
import main.model.Recommendation
import org.assertj.core.api.Assertions.assertThat
import org.assertj.core.data.Percentage
import org.junit.jupiter.api.Assertions.assertThrows
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.junit.runner.RunWith
import org.springframework.test.context.junit4.SpringRunner
import java.lang.IllegalStateException

@RunWith(SpringRunner::class)
class RankingUtilsTest {
    @Nested
    inner class BuildRankingResultsTest {

        private var companies: MutableList<Company> = mutableListOf()
        private var rankings: MutableMap<String, Float> = mutableMapOf()
        private var recommendations: MutableMap<String, Recommendation> = mutableMapOf()

        @BeforeEach()
        fun setup() {
            companies = companyList()
            rankings = companyRanks(companies)
            recommendations = highestRecommendation(companies)
        }

        @Test
        fun `Full companies success case` () {
            val finalRankings = buildRankingsResults(companies, rankings, recommendations)

            // Asserting hard coded test data to make sure object fields are copied properly
            assertThat(finalRankings[0]).isEqualTo(Ranking(
                    CompanyName("Test1", "t1"),
                    1F,
                    1F,
                    Recommendation(10F, "Strong Buy")
            ))

            assertThat(finalRankings[1].averageRanking).isEqualTo(2F)
            assertThat(finalRankings[2].averageRanking).isEqualTo(3F)
        }

        @Test
        fun `Rankings or Recommendations missing` () {
            rankings.remove(companies[0].ticker)
            recommendations.remove(companies[1].ticker)

            val finalRankings = buildRankingsResults(companies, rankings, recommendations)

            assertThat(finalRankings).hasSize(3)
            assertThat(finalRankings[0].averageRanking).isEqualTo(0F)
            assertThat(finalRankings[1].recommendation).isEqualTo(Recommendation(0F, "Sell"))
        }

        @Test
        fun `No Companies` () {
            companies = mutableListOf()

            val finalRankings = buildRankingsResults(companies, rankings, recommendations)

            assertThat(finalRankings).hasSize(0)
        }
    }

    @Nested
    inner class CalculateAverageRankingsTest {
        var tickers: MutableList<String> = mutableListOf()
        var weights: MutableMap<String, Float> = mutableMapOf()
        var companyFactors: MutableMap<String, MutableMap<String, Factor>> = mutableMapOf()

        @BeforeEach
        fun setup() {
            tickers = tickers()
            weights = weights()
            companyFactors = companyFactors()
        }

        @Test
        fun `Test perfect rankings distribution` () {
            val averageRankings: Map<String, Float> = calculateAverageRankings(tickers, weights, companyFactors)

            // Assert each ticker was ranked properly, .1% tolerance for round off values
            assertThat(averageRankings).hasSize(4)
            assertThat(averageRankings[tickers[0]]).isCloseTo(1F, Percentage.withPercentage(0.1))
            assertThat(averageRankings[tickers[1]]).isCloseTo(2F, Percentage.withPercentage(0.1))
            assertThat(averageRankings[tickers[2]]).isCloseTo(3F, Percentage.withPercentage(0.1))
            assertThat(averageRankings[tickers[3]]).isCloseTo(4F, Percentage.withPercentage(0.1))
        }

        @Test
        fun `Factor companies must be complete or exception is thrown` () {
            // Empty factors throws exception
            assertThrows(IllegalStateException::class.java) {
                calculateAverageRankings(tickers, weights, mapOf())
            }

            // One company's factors missing throws exception
            companyFactors.remove("t1")
            assertThrows(IllegalStateException::class.java) {
                calculateAverageRankings(tickers, weights, companyFactors)
            }
        }

        @Test
        fun `Factor values missing in company data defaults to 0` () {
            // Set the factors for t1 to 0
            companyFactors[tickers[0]] = mutableMapOf()

            val averageRankings: Map<String, Float> = calculateAverageRankings(tickers, weights, companyFactors)

            // Company/ticker 1 which is usually highest rank, should be lowest without factors
            assertThat(averageRankings[tickers[0]]).isGreaterThan(averageRankings[tickers[3]])
        }

        @Test
        fun `Factors within tolerances get the same ranking` () {
            companyFactors = companyFactorsWithinTolerances()

            val averageRankings: Map<String, Float> = calculateAverageRankings(tickers, weights, companyFactors)

            assertThat(averageRankings).containsAllEntriesOf(
                    mutableMapOf(Pair(tickers[0], 1F),
                                 Pair(tickers[1], 1F),
                                 Pair(tickers[2], 1F),
                                 Pair(tickers[3], 1F)
            ))
        }

        @Test
        fun `Weights set to zero are skipped` () {
            // Set the weights to 0F for all but Gross Profit
            weights.filter{it.key != Factor.GROSS_PROFIT}
                    .keys.forEach{weights[it] = 0F}

            // Set the Gross Profit factors in reverse order to prove it's the only factor being analyzed
            companyFactors[tickers[0]]?.set(Factor.GROSS_PROFIT, Factor(0F))
            companyFactors[tickers[1]]?.set(Factor.GROSS_PROFIT, Factor(.1F))
            companyFactors[tickers[2]]?.set(Factor.GROSS_PROFIT, Factor(.2F))
            companyFactors[tickers[3]]?.set(Factor.GROSS_PROFIT, Factor(.3F))

            val averageRankings: Map<String, Float> = calculateAverageRankings(tickers, weights, companyFactors)

            // Rankings will be skewed since weight isn't cumulative 100%, just check order
            assertThat(averageRankings[tickers[0]]).isGreaterThan(averageRankings[tickers[1]])
            assertThat(averageRankings[tickers[1]]).isGreaterThan(averageRankings[tickers[2]])
            assertThat(averageRankings[tickers[2]]).isGreaterThan(averageRankings[tickers[3]])
        }
    }

    @Nested
    inner class CalculateRecommendationTest {
        var companyRanks: MutableMap<String, Float> = mutableMapOf()
        var peValues: MutableMap<String, Float> = mutableMapOf()
        var tickers: MutableList<String> = mutableListOf()

        @BeforeEach
        fun setup() {
            val companies = companyList()
            companyRanks = companyRanks(companies)
            peValues = companyPes(companies)
            tickers = companies.map{it.ticker}.toMutableList()
        }

        @Test
        fun `Default test data results in distributed recommendations` () {
            val recommendations: Map<String, Recommendation> = calculateRecommendation(companyRanks, peValues)

            assertThat(recommendations).containsAllEntriesOf(mapOf(
                    Pair(tickers[0], Recommendation(10F, "Strong Buy")),
                    Pair(tickers[1], Recommendation(5F, "Hold")),
                    Pair(tickers[2], Recommendation(0F, "Strong Sell"))
            ))
        }

        @Test
        fun `Test same PE results` () {
            peValues.forEach{peValues[it.key] = 20F}

            val recommendations: Map<String, Recommendation> = calculateRecommendation(companyRanks, peValues)

            assertThat(recommendations).containsAllEntriesOf(mapOf(
                    Pair(tickers[0], Recommendation(8F, "Strong Buy")),
                    Pair(tickers[1], Recommendation(5F, "Hold")),
                    Pair(tickers[2], Recommendation(2F, "Strong Sell"))
            ))
        }

        @Test
        fun `Test equal rankings` () {
            companyRanks.forEach{companyRanks[it.key] = 1F}

            val recommendations: Map<String, Recommendation> = calculateRecommendation(companyRanks, peValues)

            // Each company should receive 6 ratings points from the ranking
            assertThat(recommendations).containsAllEntriesOf(mapOf(
                    Pair(tickers[0], Recommendation(10F, "Strong Buy")),
                    Pair(tickers[1], Recommendation(8F, "Strong Buy")),
                    Pair(tickers[2], Recommendation(6F, "Hold"))
            ))
        }

        @Test
        fun `Test missing PE` () {
            peValues.remove(tickers[0])

            val recommendations: Map<String, Recommendation> = calculateRecommendation(companyRanks, peValues)

            // First company should get 0 Rating points from PE now, resulting in only 6 Buy rating
            assertThat(recommendations[tickers[0]]).isEqualTo(Recommendation(6F, "Hold"))
        }

        @Test
        fun `Test PE range within 25%` () {
            // Set values within 15 percent of each other so ratings should be less than max/more than min
            peValues[tickers[1]] = peValues[tickers[0]]?.times(1.15F) ?: 0F
            peValues[tickers[2]] = peValues[tickers[1]]?.times(1.15F) ?: 0F

            val recommendations: Map<String, Recommendation> = calculateRecommendation(companyRanks, peValues)

            // Check the ratings are within the expected range now (middle company is still nearly average)
            assertThat(recommendations[tickers[0]]?.buyRating).isLessThan(10F).isGreaterThan(8F)
            assertThat(recommendations[tickers[1]]?.buyRating).isCloseTo(5F, Percentage.withPercentage(10.0))
            assertThat(recommendations[tickers[2]]?.buyRating).isLessThan(2F).isGreaterThan(0F)
        }

        @Test
        fun `Test rankings range` () {
            // Set the rankings below maximum and above minimum
            companyRanks[tickers[0]] = 1.5F
            companyRanks[tickers[1]] = 1.9F
            companyRanks[tickers[2]] = 2.6F

            val recommendations: Map<String, Recommendation> = calculateRecommendation(companyRanks, peValues)

            // Check the ratings are within the expected range now (middle company is still the same)
            assertThat(recommendations[tickers[0]]?.buyRating).isLessThan(10F).isGreaterThan(7F)
            assertThat(recommendations[tickers[1]]?.buyRating).isLessThan(8F).isGreaterThan(5F)
            assertThat(recommendations[tickers[2]]?.buyRating).isLessThan(3F).isGreaterThan(0F)
        }
    }
}