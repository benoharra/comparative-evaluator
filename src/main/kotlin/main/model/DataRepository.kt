package main.model

import org.springframework.data.repository.CrudRepository

interface IndustryRepository : CrudRepository<Industry, String> {
}

interface CompanyRepository : CrudRepository<CompanyAnalysis, String> {
    //fun saveIndustryCompanies(companies: List<Company>)
}