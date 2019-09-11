package main.service

import main.controller.CompanyListEntry
import main.controller.CompanyName
import main.model.Company
import main.model.CompanyAnalysis
import main.model.CompanyRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service("companyService")
class CompanyService @Autowired constructor(
        private val companyRepository: CompanyRepository
) {
    fun getAllCompanies(): List<CompanyListEntry> =
            companyRepository.findAll().map { it.toCompanyListEntry() }

    fun addCompany(company: Company, industryName: String) {
        // Find the current company in the DB if present, otherwise initialize a default
        val currentCompany = companyRepository.findById(company.ticker)
                .orElse(CompanyAnalysis(
                            company.ticker,
                            LocalDate.now(),
                            mutableSetOf(),
                            company
                ))

        // Copy the fields and update the date and most recent company factor data
        val finalCompany = currentCompany.copy(
                dateUpdated = LocalDate.now(),
                companyInfo = company
        ).apply {
            // Add the current industry to the list of industries the company belongs to
            industries.add(industryName)
        }
        companyRepository.save(finalCompany)
    }
}

private fun CompanyAnalysis.toCompanyListEntry(): CompanyListEntry =
        CompanyListEntry(
                CompanyName(
                        this.companyInfo.name,
                        ticker
                ),
                this.industries
        )