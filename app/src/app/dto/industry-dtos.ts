import { CompanyProps, Ranking, CompanyName } from './company-dtos';

export interface IndustryProps {
    id: string,
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
    industry: IndustryProps
}

export interface IndustryServerDto {
    id: string,
    name: string,
    companies: CompanyProps[],
    dateUpdated: string,
    weights: {[key: string]: number}
}

export interface IndustryViewServerDto {
    industry: IndustryServerDto,
    rankings?: RankingsView
}
