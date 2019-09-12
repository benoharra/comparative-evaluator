package main.service

import main.model.CompanyRepository
import main.model.Industry
import main.model.IndustryRepository
import main.model.Recommendation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service("industryService")
class IndustryService @Autowired constructor(
        private val industryRepository: IndustryRepository,
        private val companyService: CompanyService
){
    fun submit(industry: Industry) {
        // Save the industry as a whole
        industryRepository.save(industry)
        // Save individual companies so they can be found later
        industry.companies.forEach{companyService.addCompany(it, industry.name)}
    }

    fun submitAfterRanking(industry: Industry, companyRecommendations: Map<String, Recommendation>) {
        industryRepository.save(industry)
        industry.companies.forEach{companyService.addCompany(it, industry.name, companyRecommendations[it.ticker])}
    }

    fun getAllIndustries() : List<Industry> =
            industryRepository.findAll().asSequence().toList()

    fun getIndustry(name: String) : Industry? =
            industryRepository.findById(name).orElse(null)

}