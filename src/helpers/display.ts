// If text is longer than N truncate it
export const truncateText = (input?: string, maxLength?: number) =>
    input
        ? input.length > (maxLength ?? 5)
            ? `${input.substring(0, maxLength ?? 5)}...`
            : input
        : ''

// If we have a text longer than N split it up into greedy chunks of max N characters, split on whitespace characters.
export const chunkifyText = (input: string, chunkSize: number) => {
    const string = input.trim().split(' ')
    let index = 0
    const output: string[] = []
    output[index] = ''
    string.forEach((word) => {
        const temp = `${output[index]} ${word}`.trim()
        if (temp.length <= chunkSize) {
            output[index] = temp
        } else {
            index++
            output[index] = word
        }
    })
    return output
}
