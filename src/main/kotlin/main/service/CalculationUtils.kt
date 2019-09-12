package main.service

import main.controller.CompanyName
import main.model.*
import main.service.mapAllFactors
import java.time.LocalDate


fun rankCompanies(industry: Industry) : IndustryRanking {
    // Map the company factors to their tickers so the data is available for ranking
    val companyFactors: Map<String, Map<String, Factor>> = industry.companies.associateBy({it.ticker}, { mapAllFactors(it)})

    // Get the rankings for each company multiplied by weight
    val averageRankings: Map<String, Float> = calculateAverageRankings(industry.companies.map{it.ticker},
                                                                       industry.weights,
                                                                       companyFactors)
    // Calculate recommendations for each company
    val recommendations: Map<String, Recommendation> = calculateRecommendation(averageRankings,
                                                                               industry.companies.map{it.ticker to it.pe}.toMap())
    val rankings = industry.companies.map{
        Ranking(
                CompanyName(
                        it.name,
                        it.ticker
                ),
                averageRankings[it.ticker] ?: 0F,
                it.pe,
                recommendations[it.ticker] ?: Recommendation(0F, "Sell")
        )
    }

    return IndustryRanking(
            industry.name,
            LocalDate.now(),
            rankings
    )
}

fun calculateAverageRankings(tickers: List<String>,
                             weights: Map<String, Float>,
                             companyFactors: Map<String, Map<String, Factor>>) : Map<String, Float> {
    val averageRankings: MutableMap<String, Float> = mutableMapOf()

    // For each factor with weight, add the weighted ranking to each company in the map
    for(weight in weights) {
        // Skip any factors who's weight was set to 0
        if(weight.value == 0F)
            continue
        // Gather the rankings for the factor
        val companiesRankedByFactor = rankFactor(weight.key, tickers, companyFactors)
        // Add the factor rank multiplied by weight to each company
        companiesRankedByFactor.forEach{
            averageRankings[it.first] = (averageRankings[it.first] ?: 0F).plus(weight.value.times(it.second))
        }
    }
    return averageRankings
}

fun calculateRecommendation(companyRanks: Map<String, Float>, peValues: Map<String, Float>) : Map<String, Recommendation> =
        mutableMapOf()

fun rankFactor(factorName: String,
               companyTickers: List<String>,
               companyFactors: Map<String, Map<String, Factor>>) : List<Pair<String, Int>> {
    // Map the specific factors for each company to a list of pairs
    val factorList = companyTickers.map{it to ((companyFactors[it] ?: error("Tickers not mapped properly")).
            getOrDefault(factorName, Factor(0F)))}

    // Sort the factors based on the comparison for the factor type
    val sortedFactors: List<Pair<String, Factor>> = factorList.sortedBy{it.second}

    var currentRanking = 1

    // Initialize the list of rankings with the highest ranked value
    val rankingList: MutableList<Pair<String, Int>> = mutableListOf(Pair(sortedFactors[0].first, 1))

    var lastFactor: Factor = sortedFactors[0].second

    // Iterate through the companies and add their rank to the list, checking for values that should be the same rank
    for(i in 1 until sortedFactors.size - 1) {
        val next: Pair<String, Factor> = sortedFactors[i]
        if(!next.second.isSameRank(lastFactor)) {
            lastFactor = next.second
            currentRanking = i + 1
        }
        rankingList.add(Pair(next.first, currentRanking))
    }
    return rankingList
}

class CalculationUtils {

    private val percentageCutoff : Float = .05f


//    fun buildRankings(companies : List<Company>, weights : Map<String, Float>) : Map<String, Float> {
//        // Get a list of the companies with all of thier factors created
//        val companyFactors : List<Pair<String, Map<String, Factor>>> = companies.map{it.name to mapAllFactors(it)}.toList()
//        // Get a list of the rankings for each factor: factor name -> Company, ranking
//        //val rankedFactors : List<Pair<String, Map<String, Int>>> = weights.map{buildFactor(it.)}
//        // TODO:This function is edited for no compiler errors currently
//        return weights
//    }

    fun buildFactor(factorName: String, companies: List<Pair<String, Map<String, Factor>>>) : Pair<String, Map<String, Factor>> =
        //Pair(factorName, companies.map{it.first to it.second[factorName]})
        // TODO: This function is edited for no compiler errors
        Pair(factorName, companies[0].second)


    fun assignRankings(parameters: Map<String, Float>, mostToLeast: Boolean = true) : Map<String, Int> {
        var sortedList : List<Pair<String, Float>> = parameters.toList().sortedBy { (_, value) -> value }
        var rankedStocks : MutableMap<String, Int> = HashMap()
        for((i, stock) in sortedList.withIndex()) {
            if(i==0) {
                rankedStocks[stock.first] = 1
            } else if(mostToLeast) {
                //rankedStocks[stock.first] = if(isSameRank(stock.second,
                                //parameters[sortedList[i-1].first], mostToLeast)
            }
        }
        return mutableMapOf()
    }

    fun isSameRank(currentValueRaw : Float, previousValueRaw : Float, mostToLeast: Boolean) : Boolean =
        if(mostToLeast)
            previousValueRaw.minus(currentValueRaw).div(previousValueRaw) > percentageCutoff
        else
            currentValueRaw.minus(previousValueRaw).div(currentValueRaw) > percentageCutoff

}