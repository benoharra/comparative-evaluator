package main.service

import main.model.IndustryAnalysis

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*

@Service("migrationService")
class MigrationService @Autowired constructor(
        private val industryService: IndustryService,
        private val companyService: CompanyService
) {

    fun runAll() {
        // The first two migrations have already been successfully run
//        setAnalysesVariableInCompanies()
//        moveIndustriesToIdRepo()
        removeCompaniesWithoutAnalyses()
    }
    fun moveIndustriesToIdRepo() {
        val existingIndustries = industryService.getAllNonIdIndustries()

        existingIndustries.forEach{
            val id: UUID = UUID.randomUUID()
            industryService.submit(
                    IndustryAnalysis(
                            id,
                            it.name,
                            it.dateUpdated,
                            it.companies,
                            it.weights
                    ))
            it.companies.forEach{company ->
                companyService.addCompany(
                        company,
                        id,
                        null
                )
            }
        };
    }

    // Should not need this method again...
    fun setAnalysesVariableInCompanies() {
        companyService.getAllCompanyAnalysis().forEach{ companyService.updateCompanyAnalyses(it) }
    }

    fun removeCompaniesWithoutAnalyses() {
        companyService.removeCompaniesWithNoAnalyses(
                industryService
                        .getAllIndustries()
                        .flatMap{it.companies}
                        .map{it.ticker}
                        .toSet())
    }
}