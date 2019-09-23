package main.service

import io.mockk.*
import main.controller.CompanyName
import main.model.Industry
import main.model.IndustryRanking
import main.model.RankingRepository
import org.assertj.core.api.Assertions.assertThat
import org.assertj.core.api.Assertions.within
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.junit.runner.RunWith
import org.springframework.test.context.junit4.SpringRunner
import java.time.LocalDate
import java.time.temporal.ChronoUnit

@RunWith(SpringRunner::class)
class RankingServiceTest {

    private val industryService: IndustryService = mockk()
    private val rankingRepository: RankingRepository = mockk()

    private val rankingService = RankingService(industryService, rankingRepository)

    @BeforeEach
    fun init() {
        clearMocks(industryService, rankingRepository)
    }

    @Nested
    inner class PerformRankingTest() {

        private var companies = companyList()
        private var industry = industry(companies)


        @Test
        fun `Test ranking system includes all companies` () {
            val rankingSlot = slot<IndustryRanking>()
            val industrySlot = slot<Industry>()
            every { rankingRepository.save(capture(rankingSlot)) } returns industryRanking()
            every { industryService.submitAfterRanking(capture(industrySlot), any()) } just runs


            val rankingsView = rankingService.performRanking(industry)

            assertThat(rankingsView.industry).isEqualTo(industry.name)
            assertThat(rankingsView.rankings).hasSize(3)
            // Companies didn't have stats to create valid recommendations, should be no buy rec
            assertThat(rankingsView.bestBuy).isEqualTo(CompanyName("None", "NA"))

            assertThat(rankingSlot.captured.dateUpdated).isCloseTo(LocalDate.now(), within(1, ChronoUnit.DAYS))
            assertThat(rankingSlot.captured.industryName).isEqualTo(industry.name)
            assertThat(rankingSlot.captured.ranking).hasSize(companies.size)

            assertThat(industrySlot.captured).isEqualTo(industry);
        }
    }
}