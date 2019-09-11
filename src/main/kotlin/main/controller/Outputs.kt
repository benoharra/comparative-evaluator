package main.controller

data class CompanyListEntry(
        val companyName: CompanyName,
        val industries: Set<String>
)