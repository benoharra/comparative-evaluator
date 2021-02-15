package main.controller

import main.model.Company
import main.model.Industry
import main.model.IndustryAnalysis
import main.service.buildCompany
import java.time.LocalDate
import java.util.*

data class IndustryInput (
        val id: String?,
        val name: String,
        val companies: List<CompanyName>,
        val companyFactors: Map<String, Float>,
        val weights: Map<String, Float>
)

data class CompanyName (
       val name: String,
       val ticker: String
)

fun convertIndustry(industryInput: IndustryInput) : IndustryAnalysis =
        IndustryAnalysis(
                industryInput.id?.let{ UUID.fromString(it) } ?: UUID.randomUUID(),
                industryInput.name,
                LocalDate.now(),
                convertCompanyNames(industryInput.companies, industryInput.companyFactors),
                industryInput.weights)

fun convertCompanyNames(companyNames: List<CompanyName>, factors: Map<String, Float>): List<Company> =
        companyNames.map { buildCompany(it.name, it.ticker, factors) }