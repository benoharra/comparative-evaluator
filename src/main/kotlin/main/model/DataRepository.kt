package main.model

import org.springframework.data.repository.CrudRepository

interface IndustryRepository : CrudRepository<Industry, String> {
}

interface CompanyRepository : CrudRepository<Company, String> {
    fun saveIndustryCompanies(companies: List<Company>)
}