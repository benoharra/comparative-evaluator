package main

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class ComparableEvaluatorApplication

fun main(args: Array<String>) {
    runApplication<ComparableEvaluatorApplication>(*args)
}