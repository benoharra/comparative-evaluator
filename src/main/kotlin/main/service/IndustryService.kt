package main.service

import main.model.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*

@Service("industryService")
class IndustryService @Autowired constructor(
        private val industryRepository: IndustryRepository,
        private val industryAnalysisRepository: IndustryAnalysisRepository,
        private val companyService: CompanyService
){
    fun submit(industry: IndustryAnalysis) : IndustryAnalysis {
        // Save the industry as a whole
        industryAnalysisRepository.save(industry)
        // Save individual companies so they can be found later
        industry.companies.forEach{companyService.addCompany(it, industry.id)}
        return industry
    }

    fun submitAfterRanking(industry: IndustryAnalysis, companyRecommendations: Map<String, Recommendation>) {
        industryAnalysisRepository.save(industry)
        industry.companies.forEach{companyService.addCompany(it, industry.id, companyRecommendations[it.ticker])}
    }

    fun getAllIndustries() : List<IndustryAnalysis> =
            industryAnalysisRepository.findAll().asSequence().toList()

    fun getIndustry(id: UUID) : IndustryAnalysis? =
            industryAnalysisRepository.findById(id).orElse(null)

    fun getAllNonIdIndustries(): List<Industry> =
            industryRepository.findAll().asSequence().toList();

}