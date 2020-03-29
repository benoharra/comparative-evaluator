package main.service

import main.controller.CompanyName
import main.model.*
import kotlin.math.max
import kotlin.math.min

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
            // Weight percentages are stored as percentage value, so divide by 100 before using
            averageRankings[it.first] = (averageRankings[it.first] ?: 0F).plus(weight.value.div(100).times(it.second))
        }
    }
    return averageRankings
}

// Recommendation is based on a 0-10 scale, with 10 being strong buy and 0 being strong sell
fun calculateRecommendation(companyRanks: Map<String, Float>, peValues: Map<String, Float>): Map<String, Recommendation>  {
    // Sort the companies by smallest to largest rank
    val orderedRanks: List<Pair<String, Float>> = companyRanks.map{Pair(it.key, it.value)}.sortedBy{it.second}

    val numberOfCompanies: Float = orderedRanks.size.toFloat()

    // Calculate the average PE for the industry
    val averagePe = peValues.values.average()

    val recommendations: MutableMap<String, Recommendation> = mutableMapOf()

    // Recommendations are a combination of:
    // how high the companies average ranking is (6)
    // and their PE compared to average (4)
    for(currentCompany in orderedRanks) {
        var buyRating = 0F

        // Add the ranking portion of the company's buy rating, (N - N*(R-1)/(N-1))/N
        buyRating += 6F.times(
                (numberOfCompanies -
                        numberOfCompanies.times(currentCompany.second - 1).div(numberOfCompanies - 1)))
                      .div(numberOfCompanies)

        // Add the PE portion of the company's buy rating, percentage scale where 25% better than average is max rating (4),
        // average PE is rating 2, and 25% below average PE or worse is 0
        val pe = peValues[currentCompany.first] ?: 1000F
        buyRating += if(pe < averagePe)
            min(4F, (2 + 8F * (averagePe - pe).div(averagePe)).toFloat())
        else
            max(0F, (2 - 8F * (pe - averagePe).div(averagePe)).toFloat())

        recommendations[currentCompany.first] = Recommendation(buyRating, mapBuyRating(buyRating))
    }

    return recommendations
}

private fun mapBuyRating(rating: Float) : String =
        when {
            rating >= 8F -> "Strong Buy"
            rating >= 6.5F -> "Buy"
            rating >= 5F -> "Hold"
            rating >= 3.5F -> "Avoid"
            else -> "Strong Sell"
        }

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
    for (i in 1 until sortedFactors.size) {
        val next: Pair<String, Factor> = sortedFactors[i]
        if (!next.second.isSameRank(lastFactor)) {
            lastFactor = next.second
            currentRanking = i + 1
        }
        rankingList.add(Pair(next.first, currentRanking))
    }
    return rankingList
}

