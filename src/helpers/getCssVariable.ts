export const getCssVariable = (value: string) => {
    return getComputedStyle(document.documentElement).getPropertyValue(value)
}