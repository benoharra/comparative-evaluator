package main.service

import main.controller.CompanyName
import main.model.*

fun buildRankingsResults(companies: List<Company>,
                         rankingValues: Map<String, Float>,
                         recommendations: Map<String, Recommendation>): List<Ranking> =
        companies.map {
            Ranking(
                    CompanyName(
                            it.name,
                            it.ticker
                    ),
                    rankingValues[it.ticker] ?: 0F,
                    it.pe,
                    recommendations[it.ticker] ?: Recommendation(0F, "Sell")
            )
        }

fun calculateAverageRankings(tickers: List<String>,
                             weights: Map<String, Float>,
                             companyFactors: Map<String, Map<String, Factor>>): Map<String, Float> {
    val averageRankings: MutableMap<String, Float> = mutableMapOf()

    // For each factor with weight, add the weighted ranking to each company in the map
    for (weight in weights) {
        // Skip any factors who's weight was set to 0
        if (weight.value == 0F)
            continue
        // Gather the rankings for the factor
        val companiesRankedByFactor = rankFactor(weight.key, tickers, companyFactors)
        // Add the factor rank multiplied by weight to each company
        companiesRankedByFactor.forEach {
            averageRankings[it.first] = (averageRankings[it.first] ?: 0F).plus(weight.value.times(it.second))
        }
    }
    return averageRankings
}

fun calculateRecommendation(companyRanks: Map<String, Float>, peValues: Map<String, Float>): Map<String, Recommendation> =
        mutableMapOf()

private fun rankFactor(factorName: String,
               companyTickers: List<String>,
               companyFactors: Map<String, Map<String, Factor>>): List<Pair<String, Int>> {
    // Map the specific factors for each company to a list of pairs
    val factorList = companyTickers.map {
        it to ((companyFactors[it] ?: error("Tickers not mapped properly")).getOrDefault(factorName, Factor(0F)))
    }

    // Sort the factors based on the comparison for the factor type
    val sortedFactors: List<Pair<String, Factor>> = factorList.sortedBy { it.second }

    var currentRanking = 1

    // Initialize the list of rankings with the highest ranked value
    val rankingList: MutableList<Pair<String, Int>> = mutableListOf(Pair(sortedFactors[0].first, 1))

    var lastFactor: Factor = sortedFactors[0].second

    // Iterate through the companies and add their rank to the list, checking for values that should be the same rank
    for (i in 1 until sortedFactors.size - 1) {
        val next: Pair<String, Factor> = sortedFactors[i]
        if (!next.second.isSameRank(lastFactor)) {
            lastFactor = next.second
            currentRanking = i + 1
        }
        rankingList.add(Pair(next.first, currentRanking))
    }
    return rankingList
}

