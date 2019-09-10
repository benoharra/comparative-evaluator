package main.controller

import main.model.Company
import main.model.Industry
import main.service.convertCompanyNames
import java.time.LocalDate

class IndustryInput (
        val name: String,
        val companies: List<CompanyName>,
        val companyFactors: Map<String, Float>,
        val weights: Map<String, Float>
) {
    fun toIndustry() : Industry =
            Industry(name,
                    LocalDate.now(),
                    convertCompanyNames(companies, companyFactors),
                    weights)


}

data class CompanyName (
       val name: String,
       val ticker: String
)