import { getCssVariable } from './getCssVariable'

export const primaryColor = () => getCssVariable('--primary-color')
export const primaryColorLighter = () =>
    getCssVariable('--primary-color-lighter')
export const primaryColorLightest = () =>
    getCssVariable('--primary-color-lightest')
export const primaryColorHover = () => getCssVariable('--primary-color-hover')

export const secondaryColor = () => getCssVariable('--secondary-color')
export const secondaryColorLighter = () =>
    getCssVariable('--secondary-color-lighter')
export const secondaryColorLightest = () =>
    getCssVariable('--secondary-color-lightest')

// Legacy (AM) - don't use
export const firstChartColor = () => getCssVariable('--first-chart-color')
export const secondChartColor = () => getCssVariable('--second-chart-color')
export const thirdChartColor = () => getCssVariable('--third-chart-color')
export const fourthChartColor = () => getCssVariable('--fourth-chart-color')
export const fifthChartColor = () => getCssVariable('--fifth-chart-color')
export const sixthChartColor = () => getCssVariable('--sixth-chart-color')

export const chartColorOne = () => getCssVariable('--chart-color-one')
export const chartColorTwo = () => getCssVariable('--chart-color-two')
export const chartColorThree = () => getCssVariable('--chart-color-three')
export const chartColorFour = () => getCssVariable('--chart-color-four')
export const chartColorFive = () => getCssVariable('--chart-color-five')
export const chartColorSix = () => getCssVariable('--chart-color-six')

export const firstOwnChartColor = () =>
    getCssVariable('--first-own-chart-color')
export const secondOwnChartColor = () =>
    getCssVariable('--second-own-chart-color')
export const thirdOwnChartColor = () =>
    getCssVariable('--third-own-chart-color')
export const fourthOwnChartColor = () =>
    getCssVariable('--fourth-own-chart-color')
export const fifthOwnChartColor = () =>
    getCssVariable('--fifth-own-chart-color')
export const sixthOwnChartColor = () =>
    getCssVariable('--sixth-own-chart-color')

export const backgroundColor = () => getCssVariable('--background-color')
export const backgroundColorLighter = () =>
    getCssVariable('--background-color-lighter')

export const backgroundColorSecondary = () =>
    getCssVariable('--background-color-secondary')
export const backgroundColorSecondaryLighter = () =>
    getCssVariable('--background-color-secondary-lighter')

export const black = () => getCssVariable('--black')
export const darkGrey = () => getCssVariable('--dark-grey')
export const midGrey = () => getCssVariable('--mid-grey')
export const lightGrey = () => getCssVariable('--light-grey')
export const white = () => getCssVariable('--white')

export const blackTransparent = () => getCssVariable('--black-transparent')

export const errorColor = () => getCssVariable('--error-color')
export const successColor = () => getCssVariable('--success-color')

export const greenColor = () => getCssVariable('--green-color')
export const redColor = () => getCssVariable('--red-color')

export const companyChartColors = [
    firstOwnChartColor,
    secondOwnChartColor,
    thirdOwnChartColor,
    fourthOwnChartColor,
    fifthOwnChartColor,
    sixthOwnChartColor,
]
export const externalCompanyChartColors = [
    firstChartColor,
    secondChartColor,
    thirdChartColor,
    fourthChartColor,
    fifthChartColor,
    sixthChartColor,
]
export const companyLineChartColors = [secondaryColor, firstOwnChartColor]
export const externalCompanyLineChartColors = [
    fourthChartColor,
    secondChartColor,
]

const COMPANY_COLORS_COUNT = 6

export const getCompanyChartColorsByIndex = (index: number) => {
    return companyChartColors[index % COMPANY_COLORS_COUNT]()
}
export const getCompanyLineChartColorsByIndex = (index: number) => {
    return companyLineChartColors[index % 2]()
}

export const getExternalCompanyChartColorsByIndex = (index: number) => {
    return externalCompanyChartColors[index % COMPANY_COLORS_COUNT]()
}

export const getExternalCompanyLineChartColorsByIndex = (index: number) => {
    return externalCompanyLineChartColors[index % 2]()
}

export const getDeepdiveBarGraphColorsByIndex = (index: number) => {
    return [fourthChartColor, secondChartColor][index % 2]()
}

export const getDeepdiveBarLineGraphColorsByIndex = (index: number) => {
    return [fourthChartColor, sixthChartColor][index % 2]()
}

export const getDeepdiveBarDualLineGraphColorsByIndex = (index: number) => {
    return [fourthChartColor, secondChartColor, sixthChartColor][index % 3]()
}

export const getProviderSegmentClassFromSegmentName = (
    segment?: string
): string => {
    switch (segment) {
        case 'MARKTLEIDER':
        case 'Marktleider':
            return 'var(--fourth-chart-color)'
        case 'STRATEGISCHE PARTNER':
        case 'Strategische partner':
            return 'var(--fifth-own-chart-color)'
        case 'OPDRACHTNEMER':
        case 'Opdrachtnemer':
            return 'var(--primary-color-lighter)'
        case 'LOKALE SPELER':
        case 'Lokale speler':
            return 'var(--secondary-color-lighter)'
        default:
            return ''
    }
}
