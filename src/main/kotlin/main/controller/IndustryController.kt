package main.controller

import main.model.Industry
import main.model.IndustryAnalysis
import main.service.IndustryService
import main.service.MigrationService
import main.service.RankingService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/industry")
class IndustryController @Autowired constructor(
        private val industryService: IndustryService,
        private val rankingService: RankingService
) {

    @PostMapping("/save")
    fun saveIndustry(@RequestBody industryInput: IndustryInput) : IndustryAnalysis =
            industryService.submit(convertIndustry(industryInput))

    @GetMapping("/all")
    fun getIndustries() : List<IndustryAnalysis> =
            industryService.getAllIndustries()

    @PostMapping("/analyze")
    fun performAnalysis(@RequestBody industryInput: IndustryInput)  =
            rankingService.performRanking(convertIndustry(industryInput))

    @GetMapping("/ranking")
    fun getIndustryRankings(@RequestParam id: String) : RankingsView =
            rankingService.getIndustryRanking(UUID.fromString(id))

    @GetMapping("/view")
    fun viewIndustry(@RequestParam id: UUID) : IndustryView =
            IndustryView(industryService.getIndustry(id))

    @DeleteMapping("/delete")
    fun deleteIndustry(@RequestParam id: UUID) = industryService.deleteAnalysis(id)
}