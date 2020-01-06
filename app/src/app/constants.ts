export class Constants {
    // Factor categories
    public static get PROFITABILITY(): string { return "Profitability"; };
    public static get LEVERAGE(): string { return "Leverage"; }
    public static get LIQUIDITY(): string { return "Liquidity"; }
    public static get EFFICIENCY(): string { return "Efficiency" }
    public static get GROWTH(): string { return "Growth" }

    public static get FACTOR_CATEGORIES(): Set<string> {
        return new Set<string>([
            Constants.PROFITABILITY,
            Constants.LIQUIDITY,
            Constants.LEVERAGE,
            Constants.EFFICIENCY,
            Constants.GROWTH
        ]);
    }

    public static get PROFITABILITY_FACTORS(): string[] {
        return [
            Constants.GROSS_PROFIT,
            Constants.NET_PROFIT,
            Constants.ROE,
            Constants.ROI
        ];
    }

    public static get LIQUIDITY_FACTORS(): string[] {
        return [
            Constants.QUICK_RATIO,
            Constants.CURRENT_RATIO
        ];
    }

    public static get LEVERAGE_FACTORS(): string[] {
        return [
            Constants.DEBT_TO_EQUITY,
            Constants.INTEREST_COVERAGE
        ];
    }

    public static get EFFICIENCY_FACTORS(): string[] {
        return [
            Constants.RECEIVABLES_TURN,
            Constants.ASSET_TURN,
            Constants.INVENTORY_TURN
        ];
    }

    public static get GROWTH_FACTORS(): string[] {
        return [
            Constants.FIVE_YR_REV,
            Constants.ONE_YR_REV,
            Constants.FIVE_YR_EPS,
            Constants.ONE_YR_EPS
        ];
    }

    // Profitability
    public static get GROSS_PROFIT(): string { return "Gross Profit Margin"; }
    public static get NET_PROFIT(): string { return "Net Profit Margin"; }
    public static get ROE(): string { return "Return on Equity"; }
    public static get ROI(): string { return "Return on Investment"; }

    // Liquidity
    public static get QUICK_RATIO(): string { return "Quick Ratio"; }
    public static get CURRENT_RATIO(): string { return "Current Ratio"; }

    // Leverage
    public static get DEBT_TO_EQUITY(): string { return "Debt to Equity"; }
    public static get INTEREST_COVERAGE(): string { return "Interest Coverage"; }

    // Efficiency
    public static get RECEIVABLES_TURN(): string { return "Receivables Turnover"; }
    public static get ASSET_TURN(): string { return "Asset Turnover"; }
    public static get INVENTORY_TURN(): string { return "Inventory Turnover"; }

    // Growth
    public static get FIVE_YR_REV(): string { return "5 yr. Revenue Growth"; }
    public static get ONE_YR_REV(): string { return "1 yr. Revenue Growth"; }
    public static get FIVE_YR_EPS(): string { return "5 yr. EPS Growth"; }
    public static get ONE_YR_EPS(): string { return "1 yr. EPS Growth"; }
}