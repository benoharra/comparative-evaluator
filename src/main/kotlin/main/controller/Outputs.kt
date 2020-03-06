package main.controller

import main.model.Company
import main.model.Industry
import main.model.Ranking
import main.model.Recommendation
import java.time.LocalDate

data class CompanyListEntry(
        val companyName: CompanyName,
        val industries: Set<String>
)

data class RankingsView(
        val industry: String,
        val dateUpdated: LocalDate,
        val rankings: List<Ranking>,
        val bestBuy: CompanyName
)

data class IndustryView(
        val industry: Industry?
)

data class CompanyView(
        val name: CompanyName,
        val dateUpdated: LocalDate,
        val industries: Set<String>,
        val data: Company,
        val recommendation: Recommendation?
)