export const formatDate = (date: Date | null): string => {
    if (date) {
        return `${date.getDate().toString().padStart(2, '0')}-${(
            date.getMonth() + 1
        )
            .toString()
            .padStart(2, '0')}-${date.getFullYear()}`
    }

    return ''
}