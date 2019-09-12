package main.controller

import main.model.Ranking
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