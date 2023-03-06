export const formatCurrency = (
    value: number,
    currencyCode: string = 'EUR',
    digits: number = 1,
    style: 'long' | 'medium' | 'short' = 'long',
    asDash: boolean = true,
) => {
    if (value === Infinity) return '-'
    const formattingOptions = {
        style: 'currency',
        currency: currencyCode && currencyCode !== 'N/A' ? currencyCode : 'EUR',
        currencyDisplay: 'symbol',
        notation: 'standard',
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
        useGrouping: style === 'long',
    }

    if (asDash && !value) {
        return '-'
    }

    // 2 digits if > 1B
    if (value > 1000000000 && digits !== 0) {
        formattingOptions.minimumFractionDigits = 2
        formattingOptions.maximumFractionDigits = 2
    }

    if (style === 'medium') {
        formattingOptions.notation = 'compact'
    }

    if (style === 'short') {
        formattingOptions.notation = 'compact'
        formattingOptions.currencyDisplay = 'narrowSymbol'
    }

    return value
}
