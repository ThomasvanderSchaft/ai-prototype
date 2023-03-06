export const formatPercentage = (
    value: number,
    digits: number = 1,
    style: 'long' | 'short' = 'long',
    nullable: boolean = false,
    asDash: boolean = true
) => {
    if (value === Infinity) return '-'
    const formattingOptions = {
        style: 'percent',
        notation: 'standard',
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
        useGrouping: false,
    }

    if (style === 'short') {
        formattingOptions.notation = 'compact'
    }



    return value ? nullable ? null : asDash ? '-' : '0%' : null
}
