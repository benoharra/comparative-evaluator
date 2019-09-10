package main.controller

import main.model.Company
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController

@RestController("/data")
class DataController {

    @PostMapping("/submit")
    fun submitCompanies(industry: String,
                        companies: List<Company>,
                        weights: Map<String, Float>) : Map<String, Float> =




}