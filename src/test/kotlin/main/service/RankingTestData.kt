package main.service

import main.model.*
import java.time.LocalDate

fun companyList() : MutableList<Company> =
        mutableListOf(
                Company("Test1", "t1", 1.0F, null, null, null, null, null),
                Company("Test2", "t2", 2.0F, null, null, null, null, null),
                Company("Test3", "t3", 3.0F, null, null, null, null, null)
        )

fun industry(companies: List<Company>) : Industry =
        Industry(
                "Test",
                LocalDate.now(),
                companies,
                mapOf()
        )

fun companyRanks(companies: List<Company>) : MutableMap<String, Float>{
    var rank = 1F
    var rankings: MutableMap<String, Float> = mutableMapOf()
    companies.forEach{
        rankings[it.ticker] = rank
        rank += 1F
    }
    return rankings
}

fun companyPes(companies: List<Company>) : MutableMap<String, Float> =
        companies.map{it.ticker to it.pe}.toMap().toMutableMap()

fun highestRecommendation(companies: List<Company>) : MutableMap<String, Recommendation> =
        companies.map{it.ticker to Recommendation(10F, "Strong Buy")}.toMap().toMutableMap()

fun tickers() : MutableList<String> =
        mutableListOf("t1", "t2", "t3", "t4")

// Weights have 2 factors from profitability, then 1 factor from each other group with 100% total weight
fun weights() : MutableMap<String, Float> =
        mutableMapOf(Pair(Factor.GROSS_PROFIT, 20F),
                Pair(Factor.NET_PROFIT, 5F),
                Pair(Factor.QUICK_RATIO, 15F),
                Pair(Factor.DEBT_TO_EQUITY, 15F),
                Pair(Factor.RECEIVABLE_TURNOVER, 15F),
                Pair(Factor.FIVE_YEAR_SALES, 30F))

// This method uses tickers from the default set above, Factors should result in perfect company average ranks 1-4
fun companyFactors() : MutableMap<String, MutableMap<String, Factor>> {
    val tickers = tickers()
    return mutableMapOf(Pair(tickers[0],
            mutableMapOf(Pair(Factor.GROSS_PROFIT, Factor(.50F)),
                    Pair(Factor.NET_PROFIT, Factor(.25F)),
                    Pair(Factor.QUICK_RATIO, Factor(4F)),
                    Pair(Factor.DEBT_TO_EQUITY, Factor(0F, sortedHighestToLowest = false)),
                    Pair(Factor.RECEIVABLE_TURNOVER, Factor(4F)),
                    Pair(Factor.FIVE_YEAR_SALES, Factor(.50F)))),
            Pair(tickers[1],
                    mutableMapOf(Pair(Factor.GROSS_PROFIT, Factor(.40F)),
                            Pair(Factor.NET_PROFIT, Factor(.2F)),
                            Pair(Factor.QUICK_RATIO, Factor(3F)),
                            Pair(Factor.DEBT_TO_EQUITY, Factor(.1F, sortedHighestToLowest = false)),
                            Pair(Factor.RECEIVABLE_TURNOVER, Factor(3F)),
                            Pair(Factor.FIVE_YEAR_SALES, Factor(.40F)))),
            Pair(tickers[2],
                    mutableMapOf(Pair(Factor.GROSS_PROFIT, Factor(.30F)),
                            Pair(Factor.NET_PROFIT, Factor(.15F)),
                            Pair(Factor.QUICK_RATIO, Factor(2F)),
                            Pair(Factor.DEBT_TO_EQUITY, Factor(.2F, sortedHighestToLowest = false)),
                            Pair(Factor.RECEIVABLE_TURNOVER, Factor(2F)),
                            Pair(Factor.FIVE_YEAR_SALES, Factor(.30F)))),
            Pair(tickers[3],
                    mutableMapOf(Pair(Factor.GROSS_PROFIT, Factor(.20F)),
                            Pair(Factor.NET_PROFIT, Factor(.1F)),
                            Pair(Factor.QUICK_RATIO, Factor(1F)),
                            Pair(Factor.DEBT_TO_EQUITY, Factor(.3F, sortedHighestToLowest = false)),
                            Pair(Factor.RECEIVABLE_TURNOVER, Factor(1F)),
                            Pair(Factor.FIVE_YEAR_SALES, Factor(.2F)))))
}

fun companyFactorsWithinTolerances() : MutableMap<String, MutableMap<String, Factor>> {
    val tickers = tickers()
    return mutableMapOf(Pair(tickers[0],
            mutableMapOf(Pair(Factor.GROSS_PROFIT, Factor(.50F, tolerancePercentage = .5F)))),
            Pair(tickers[1],
                    mutableMapOf(Pair(Factor.GROSS_PROFIT, Factor(.45F, tolerancePercentage = .5F)))),
            Pair(tickers[2],
                    mutableMapOf(Pair(Factor.GROSS_PROFIT, Factor(.4F, tolerancePercentage = .5F)))),
            Pair(tickers[3],
                    mutableMapOf(Pair(Factor.GROSS_PROFIT, Factor(.35F, tolerancePercentage = .5F)))))
}

fun industryRanking() : IndustryRanking =
        IndustryRanking(
                "test",
                LocalDate.now(),
                listOf()
        )