import { ref, watch } from 'vue'

export const useLocalStorage = <T>(key: string) => {
    const init = localStorage.getItem(key)

    const variable = ref<T>(init ? JSON.parse(init) : undefined)

    watch(
        variable,
        (to) => {
            localStorage.setItem(key, JSON.stringify(to))
        },
        { deep: true }
    )

    return variable
}
