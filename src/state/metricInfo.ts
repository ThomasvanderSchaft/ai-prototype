const metricInfo = {
    BSLbltsEquity: { type: 'currency' },
    BSLbltsEquityGrowth: { type: 'percentage' },
    CapexTFACapexdepreciationstangible: {
        type: 'value',
        formatter: (value: number) => value.toFixed(1),
    },
    CapexTFACapextangible: { type: 'currency' },
    CapexTFACapextangibleGrowth: { type: 'value' },
    FHLiqCashConversionCycleCCCGrowth: { type: 'value' },
    FHLiqCurrentratio: {
        type: 'value',
        formatter: (value: number) => value.toFixed(2),
    },
    FHLiqCurrentratioGrowth: { type: 'percentage' },
    FHLiqInterestCoverageRatio: {
        type: 'value',
        formatter: (value: number) => value.toFixed(1),
    },
    FHLiqQuickratio: { type: 'percentage' },
    FHLiqWorkingcapitalGrowth: { type: 'value' },
    FHLongtermNetDebt: { type: 'currency' },
    FHLongtermNetDebtEBITDA: {
        type: 'value',
        formatter: (value: number) => value.toFixed(1),
    },
    FHLongtermNetDebtEBITDAGrowth: { type: 'percentage' },
    FHLongtermSolvencyguar: { type: 'percentage' },
    PLExpensesPerOtheroPerExpenses: { type: 'percentage' },
    PLExpensesPerOtheroPerExpensesGrowth: { type: 'percentage' },
    PLExpensesStaffcostsFTE: { type: 'currency' },
    PLExpensesTotalexceptionalresult: { type: 'currency' },
    PLExpensesTotalexceptionalresultGrowth: { TYPE: 'value' },
    PLIncomeNetsales: { type: 'currency' },
    PLIncomeNetsalesGrowth: { type: 'percentage' },
    PLIncomeOtheroperatingincomeGrowth: { type: 'percentage' },
    PLIncomeOtheroperatingincome: { type: 'currency' },
    PLIncomeNetSalesGrowthCalc: { type: 'percentage' },
    PLProfitAbsGrossMarginGrowth: { type: 'value' },
    PLProfitEBIT: { type: 'currency' },
    PLProfitEBITDA: { type: 'currency' },
    PLProfitGrossmargin: { type: 'currency' },
    PLProfitPerEBITDA: { type: 'percentage' },
    PLProfitPerEBIT: { type: 'percentage' },
    PLProfitPerGrossmargin: { type: 'percentage' },
    PLProfitProfitaftertaxes: { type: 'currency' },
    PLProfitPerProfitaftertaxes: { type: 'percentage' },
    PLProfitProfitbeforetaxesGrowth: { type: 'value' },
    ReturnRatiosReturnonAssets: { type: 'percentage' },
    ReturnRatiosReturnonAssetsGrowth: { type: 'percentage' },
    ReturnRatiosReturnoncapitalemployed: { type: 'percentage' },
    PLExpensesPerCostofGoodsSoldCostofSales: { type: 'percentage' },
    PLExpensesPerStaffcosts: { type: 'percentage' },
    PLExpensesPerOtheroPerExpens1s: { type: 'percentage' },
    PLExpensesPerDepreciationsex39exceptdepreciations: { type: 'percentage' },
    PLExpensesCostofGoodsSoldCostofSales: { type: 'currency' },
    PLExpensesStaffcosts: { type: 'currency' },
    PLExpensesOtheroperatingexpenses: { type: 'currency' },
    PLExpensesDepreciationsexclexceptdepreciations: { type: 'currency' },
    FHLongtermOperCapitalemployed: { type: 'currency' },
    FHLiqWorkingcapital: { type: 'currency' },
    FHLiqPerWorkingcapital: { type: 'percentage' },
    PLExpensesPerDepreciationsexclexceptdepreciations: { type: 'percentage' },
    BSLbltsTotalassets: { type: 'currency' },
    PLExpensesFinancialresult: { type: 'currency' },
    PLProfitProfitbeforetaxes: { type: 'currency' },
    PLProfitResultfromparticipations: { type: 'currency' },
    BSLbltsLiabilities: { type: 'currency' },
    PLIncomeNetsalesFTE: { type: 'currency' },
    ReturnRatiosReturnonequity: { type: 'percentage' },
    PLStaffTotalstaffFTE: {
        type: 'value',
        label: 'FTE',
        formatter: (value: number) =>
            value.toLocaleString('en-GB', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }),
    },
    PLExpensesTotalstaffcosts: { type: 'currency' },
    BSAssetsLandandbuildings: { type: 'currency' },
    BSAssetsMachinesandinstallations: { type: 'currency' },
    BSAssetsVehicles: { type: 'currency' },
    BSAssetsOtherTFA: { type: 'currency' },
    BSAssetsUnderconstruction: { type: 'currency' },
    CFSOperOperationalcashflowCalc: { type: 'currency' },

    BSAssetsInventories: { type: 'currency' },
    BSAssetsTradedebtors: { type: 'currency' },
    FHLiqOtherreceivables: { type: 'currency' },
    BSLbltsTradecreditors: { type: 'currency' },
    FHLiqOthercurrentliabilities: { type: 'currency' },

    FHLiqDaysInventoryOutstandingDIO: {
        type: 'value',
        formatter: (value: number) =>
            value.toLocaleString('en-GB', {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
            }),
    },
    FHLiqDaysSalesOutstandingDSO: {
        type: 'value',
        formatter: (value: number) =>
            value.toLocaleString('en-GB', {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
            }),
    },
    FHLiqDaysPayablesOutstandingDPO: {
        type: 'value',
        formatter: (value: number) =>
            value.toLocaleString('en-GB', {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
            }),
    },
    FHLiqCashConversionCycleCCC: {
        type: 'value',
        formatter: (value: number) =>
            value.toLocaleString('en-GB', {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
            }),
    },

    CapexOverallNetCapex: { type: 'currency' },
    CapexOverallNetCapexTotaldepreciations: {
        type: 'value',
        formatter: (value: number) =>
            value.toLocaleString('en-GB', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }),
    },
    BSAssetsTotalassets: { type: 'currency' },

    // Growth
    PLProfitAbsEBITGrowth: { type: 'percentage' },
    PLProfitAbsEBITDAGrowth: { type: 'percentage' },

    // Special metrics
    PLIncomeNetsalesregion: { type: 'currency', is_special: true },
    PLIncomeNetsalesactivity: { type: 'currency', is_special: true },

    // Custom metrics
    CUSTOM_NetSalesGrowth: {
        type: 'percentage',
        // This is a percentage, but contained in a currency, since the number may be different, based on the selected currency
        getData: (arr) => arr?.EUR,
    },

    // Indicators
    PLProfitEBITIndicator: { type: 'currency' },
    PLProfitEBITDAIndicator: { type: 'currency' },
    PLProfitEBITImprovementPotential: { type: 'currency' },
    PLProfitEBITDAImprovementPotential: { type: 'currency' },

    // BSOther
    BSOtherBalancesheetdate: { type: 'value' },
    BSOtherDays: {
        type: 'value',
        label: (value: number) => `${value} days`,
        formatter: (value: number) =>
            value.toLocaleString('en-GB', {
                maximumFractionDigits: 0,
            }),
    },
    OtherOtherFigureType: { type: 'value' },
}
export const getMetricInfo = (metricName: string) => metricInfo[metricName]

