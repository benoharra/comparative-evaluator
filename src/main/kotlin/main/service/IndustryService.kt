package main.service

import main.model.Company
import main.model.CompanyRepository
import main.model.Industry
import main.model.IndustryRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service("industryService")
class IndustryService @Autowired constructor(
        private val industryRepository: IndustryRepository,
        private val companyRepository: CompanyRepository
){
    fun submit(industry: Industry) {
        // Save the industry as a whole
        industryRepository.save(industry)
        // Save individual companies so they can be found later
        industry.companies.forEach{companyRepository.save(it)}
    }

    fun getAllIndustries() : List<Industry> =
            industryRepository.findAll().asSequence().toList()

    fun getIndustry(name: String) : Industry? =
            industryRepository.findById(name).orElse(null)

    fun getCompany(ticker: String) : Company? =
            companyRepository.findById(ticker).orElse(null)
}