package main.model

import org.springframework.data.repository.CrudRepository
import java.util.*

interface IndustryRepository : CrudRepository<Industry, String> {
}

interface IndustryAnalysisRepository : CrudRepository<IndustryAnalysis, UUID> {
}

interface CompanyRepository : CrudRepository<CompanyAnalysis, String> {
}

interface RankingRepository : CrudRepository<IndustryRanking, UUID> {

}