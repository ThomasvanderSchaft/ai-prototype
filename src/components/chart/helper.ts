import { getCssVariable } from '@/helpers/getCssVariable'
import {
    redColor,
    firstChartColor,
    secondChartColor,
    thirdChartColor,
    fourthChartColor,
    fifthChartColor,
    sixthChartColor,
    firstOwnChartColor,
    secondOwnChartColor,
    thirdOwnChartColor,
    fourthOwnChartColor,
} from '@/helpers/colors'

// This function defines the color schemes for the charts.
export const getChartColorByIndex: (
    index: number,
    scheme?: 'default' | 'customer' | 'timescale'
) => string = (index, scheme) =>
    ({
        default: [thirdChartColor(), secondChartColor(), firstChartColor()],
        customer: [
            fourthOwnChartColor(),
            thirdOwnChartColor(),
            secondOwnChartColor(),
            firstOwnChartColor(),
        ],
        timescale: [
            firstChartColor(),
            secondChartColor(),
            thirdChartColor(),
            fourthChartColor(),
            fifthChartColor(),
            sixthChartColor(),
        ],
    }[scheme ?? 'default']?.[index] ?? redColor())

export const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
        hex.match('#') ? hex.split('#')[1] : hex
    )
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null
}

const chartColorSchemes = {
    default: [
        'chart-color-six',
        'chart-color-five',
        'chart-color-four',
        'chart-color-three',
        'chart-color-two',
        'chart-color-one',
    ],
    timescale: [
        'chart-color-one',
        'chart-color-two',
        'chart-color-three',
        'chart-color-four',
        'chart-color-five',
        'chart-color-six',
    ],
    customer: [
        'chart-color-self-six',
        'chart-color-self-five',
        'chart-color-self-four',
        'chart-color-self-three',
        'chart-color-self-two',
        'chart-color-self-one',
    ],
    'timescale-customer': [
        'chart-color-self-one',
        'chart-color-self-two',
        'chart-color-self-three',
        'chart-color-self-four',
        'chart-color-self-five',
        'chart-color-self-six',
    ],
    'bar-line': ['chart-color-two', 'chart-color-four'],
    'bar-line-customer': ['chart-color-self-two', 'chart-color-self-four'],
    '2bar-line': ['chart-color-one', 'chart-color-two', 'chart-color-four'],
    bar: ['chart-color-four'],
    'bar-customer': ['chart-color-self-four'],
    'multiple-bar': [],
    line: ['chart-color-four'],
    'line-customer': ['chart-color-self-four'],
    '2-lines': ['chart-color-four', 'chart-color-two'],
    '2-lines-customer': ['chart-color-self-four', 'chart-color-self-two'],
}

export const getChartColor = (index: number, colorScheme?: string) =>
    getCssVariable(
        `--${
            chartColorSchemes[colorScheme ?? 'default']?.[index] ?? 'primary-color'
        }`
    )
