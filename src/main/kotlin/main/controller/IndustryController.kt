package main.controller

import main.model.Industry
import main.service.IndustryService
import main.service.RankingService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/industry")
class IndustryController @Autowired constructor(
        private val industryService: IndustryService,
        private val rankingService: RankingService
) {

    @PostMapping("/save")
    fun saveIndustry(@RequestBody industryInput: IndustryInput) =
            industryService.submit(convertIndustry(industryInput))

    @GetMapping("/all")
    fun getIndustries() : List<Industry> =
            industryService.getAllIndustries()

    @PostMapping("/analyze")
    fun performAnalysis(@RequestBody industryInput: IndustryInput)  =
            rankingService.performRanking(convertIndustry(industryInput))

    @GetMapping("/ranking")
    fun getIndustryRankings(@RequestParam name: String) : RankingsView =
            rankingService.getIndustryRanking(name)

    @GetMapping("/view")
    fun viewIndustry(@RequestParam name: String) : IndustryView =
            IndustryView(industryService.getIndustry(name))

}