import { CompanyProps, Ranking, CompanyName } from './company-dtos';

export interface IndustryProps {
    name: string,
    companies: CompanyProps[],
    dateUpdated: string,
    weights: Map<string, number>
}

export interface RankingsView {
    industry: string,
    dateUpdated: string,
    rankings: Ranking[],
    bestBuy: CompanyName
}

export interface IndustryView {
    industry: IndustryProps,
    rankings?: RankingsView
}

export interface IndustryServerDto {
    name: string,
    companies: CompanyProps[],
    dateUpdated: string,
    weights: {[key: string]: number}
}

export interface IndustryViewServerDto {
    industry: IndustryServerDto,
    rankings?: RankingsView
}
