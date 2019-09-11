package main.controller

import main.model.Industry
import main.service.IndustryService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController

@RestController("/industry")
class IndustryController @Autowired constructor(
        private val industryService: IndustryService
) {

    @PostMapping("/save")
    fun saveIndustry(industryInput: IndustryInput) =
            industryService.submit(convertIndustry(industryInput))

    @GetMapping("/all")
    fun getIndustries() : List<Industry> =
            industryService.getAllIndustries()


}