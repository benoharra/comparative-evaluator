package main.service

import main.controller.CompanyListEntry
import main.controller.CompanyName
import main.controller.CompanyView
import main.model.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.time.LocalDate
import java.util.*

@Service("companyService")
class CompanyService @Autowired constructor(
        private val companyRepository: CompanyRepository,
        private val industryAnalysisRepository: IndustryAnalysisRepository
) {
    // Need to be able to pull out the industry list and put into the old format to convert
    fun getAllCompanies(): List<CompanyListEntry> =
            companyRepository.findAll().map { it.toCompanyListEntry() }

    fun addCompany(company: Company,
                   industryId: UUID,
                   recommendation: Recommendation? = null) {
        // Find the current company in the DB if present, otherwise initialize a default
        val currentCompany = companyRepository.findById(company.ticker)
                .orElse(CompanyAnalysis(
                            company.ticker,
                            LocalDate.now(),
                            mutableSetOf(),
                            company,
                            mutableSetOf()))

        // Copy the fields and update the date and most recent company factor data
        val finalCompany = currentCompany.copy(
                dateUpdated = LocalDate.now(),
                companyInfo = company,
                recommendation = recommendation
        ).apply {
            // Add the current industry to the list of industries the company belongs to
            analyses?.add(industryId)
        }
        companyRepository.save(finalCompany)
    }

    fun viewCompany(ticker: String): CompanyView? =
            companyRepository.findById(ticker).orElse(null)
                ?.toCompanyView()

    fun getAllCompanyAnalysis(): List<CompanyAnalysis> = companyRepository.findAll().toList()

    fun updateCompanyAnalyses(company: CompanyAnalysis) =
            companyRepository.save(
                    company.copy(
                            analyses = mutableSetOf()
                    )
            )

    // TODO: This is super inefficient...save industry ID -> name in separate repo
    fun convertIndustryList(industryIds: MutableSet<UUID>?) =
            industryIds?.map{ industryAnalysisRepository.findById(it).map(IndustryAnalysis::name) }
                    ?.filter{name -> name.isPresent}
                    ?.map{nameOptional -> nameOptional.get()}
                    ?.toSet()
                    ?: emptySet();

    private fun CompanyAnalysis.toCompanyListEntry(): CompanyListEntry =
            CompanyListEntry(
                    CompanyName(
                            this.companyInfo.name,
                            ticker
                    ),
                    convertIndustryList(this.analyses)
            )

    fun CompanyAnalysis.toCompanyView() =
            CompanyView(
                    CompanyName(this.companyInfo.name, this.ticker),
                    this.dateUpdated,
                    convertIndustryList(this.analyses),
                    this.companyInfo,
                    this.recommendation
            )
}