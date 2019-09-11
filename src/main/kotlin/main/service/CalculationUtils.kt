package main.service

import main.model.Company
import main.model.Factor
import main.service.mapAllFactors

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