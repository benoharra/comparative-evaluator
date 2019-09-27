package main.controller

import main.service.CompanyService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/company")
class CompanyController @Autowired constructor(
        private val companyService: CompanyService
) {

    @GetMapping("/all")
    fun getAllCompanies() : List<CompanyListEntry> =
        companyService.getAllCompanies()

    @GetMapping("/view")
    fun viewCompany(@RequestParam ticker: String): CompanyView? =
        companyService.viewCompany(ticker)
}