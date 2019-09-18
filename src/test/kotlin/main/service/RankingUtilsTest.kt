package main.service

import main.controller.CompanyName
import main.model.Company
import main.model.Ranking
import main.model.Recommendation
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.runner.RunWith
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class RankingUtilsTest {
    @Nested
    inner class BuildRankingResultsTest {

        private val companies: List<Company> = buildCompanyList()

        @Test
        fun `Full companies success case` () {
            val rankings: MutableMap<String, Float> = mutableMapOf()
            val recommendations: MutableMap<String, Recommendation> = mutableMapOf()
            var rank = 1F
            companies.forEach{
                rankings[it.ticker] = rank
                rank += 1F
            }
            companies.forEach{recommendations[it.ticker] = Recommendation(10F, "Strong Buy")}

            val finalRankings = buildRankingsResults(companies, rankings, recommendations)

            assertThat(finalRankings[0]).isEqualTo(Ranking(
                    CompanyName("Test1", "t1"),
                    1F,
                    1F,
                    Recommendation(10F, "Strong Buy")
            ))

            assertThat(finalRankings[1].averageRanking).isEqualTo(2F)
            assertThat(finalRankings[2].averageRanking).isEqualTo(3F)
        }

        private fun buildCompanyList() : List<Company> {
            var companies: MutableList<Company> = mutableListOf()

            companies.add(Company("Test1", "t1", 1.0F,
                    null, null, null, null, null))
            companies.add(Company("Test2", "t2", 2.0F,
                    null, null, null, null, null))
            companies.add(Company("Test3", "t3", 3.0F,
                    null, null, null, null, null))
            return companies
        }
    }
}