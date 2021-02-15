package main.controller

import main.service.MigrationService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/admin")
class AdminController @Autowired constructor(
        private val migrationService: MigrationService
) {
    @GetMapping("/migrateAll")
    fun migrate() = migrationService.runAll();
}