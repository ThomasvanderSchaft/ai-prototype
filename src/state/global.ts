import { ref } from 'vue'

const mobileMenuOpen = ref(false)

export const useGlobalState = () => {
    const toggleMobileMenu = () => {
        mobileMenuOpen.value = !mobileMenuOpen.value
    }

    const closeMobileMenu = () => {
        mobileMenuOpen.value = false
    }

    return {
        mobileMenuOpen,
        closeMobileMenu,
        toggleMobileMenu,
    }
}
