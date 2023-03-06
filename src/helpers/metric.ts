import { getMetricInfo } from '@/state/metricInfo'

export type CurrencyType = { [currency: string]: number }

interface OptionsType {
    formatAs?: 'k' | 'm' | 'b' | 'auto' | string
    decimals?: 'auto' | number
    skipFormatPrefix?: boolean
}

export const getMetricValue = (
    value: number | CurrencyType | undefined,
    metricName: string
) =>
    getMetricInfo(metricName)?.getData
        ? getMetricInfo(metricName)?.getData(value)
        : getMetricInfo(metricName)?.type === 'currency'
            ? (value as CurrencyType)?.EUR
            : (value as number)

export const formatMetricValue = (
    value: number | null | undefined,
    metricName: string,
    options?: OptionsType
) => {
    if (!value && value !== 0) return '-'

    const metricInfo = getMetricInfo(metricName)

    // If we have a metric-specified formatter, run that
    if (metricInfo.formatter) {
        return `${
            metricInfo.formatter(value) +
            (metricInfo.label
                ? typeof metricInfo.label === 'function'
                    ? ` ${metricInfo.label(value)}`
                    : ` ${metricInfo.label}`
                : '')
        }`
    } else {
        // Else run the default formatter for the type
        return `${formatValue(value, metricInfo?.type, metricInfo.label, options)}`
    }
}

export const formatValue = (
    value: number | CurrencyType,
    method: 'currency' | 'percentage' | 'value',
    label: string | ((value: number) => void) = '',
    options?: OptionsType
) => {
    switch (method) {
        case 'currency':
            if (value === 0) return '€ 0,0'
            return (value as CurrencyType)?.EUR
                ? `€ ${formatLargeNumber((value as CurrencyType)?.EUR, options)}`
                : typeof value === 'number'
                    ? `€ ${formatLargeNumber(value, options)}`
                    : '-'
        case 'percentage':
            return formatPercentage(
                value as number,
                options?.decimals !== 'auto' ? options?.decimals : 1
            )
        case 'value':
            return label
                ? `${(value as number).toFixed(
                    options?.decimals
                        ? options.decimals !== 'auto'
                            ? options.decimals
                            : 1
                        : 1
                )} ${typeof label === 'function' ? label(value as number) : label} `
                : (value as number)
        default:
            console.error(`Unknown metric type: ${method}`)
            return value as number
    }
}

const formatLargeNumber = (n: number, options?: OptionsType) => {
    let mode = options?.formatAs ?? 'auto'
    if (mode === 'auto') {
        if (n >= 1000000000) {
            mode = 'b'
        } else if (n > 1000000) {
            mode = 'm'
        } else {
            mode = 'k'
        }
    }
    const decimals = options?.decimals
        ? options.decimals !== 'auto'
            ? options.decimals
            : 1
        : 1

    const localeFormat = (number: number) =>
        number.toLocaleString('en-GB', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        })

    // Format according to the current locale
    switch (mode) {
        case 'k':
            return `${localeFormat(n / 1000000)}${options?.skipFormatPrefix ? '' : 'th'}`
        case 'm':
            return `${localeFormat(n / 1000000)}${options?.skipFormatPrefix ? '' : 'm'}`
        case 'b':
            return `${localeFormat(n / 1000000)}${options?.skipFormatPrefix ? '' : 'b'}`
        default:
            return n.toFixed(decimals)
    }
}
export const formatPercentage = (number: number, decimals = 1) =>
    !isNaN(number) ? number && `${(number * 100).toFixed(decimals)}%` : '-'
