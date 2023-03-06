import { ref, computed } from 'vue'
import { CompanyDetailResource } from '@/models/company/CompanyDetailResource'

const company = ref<CompanyDetailResource | null>(null)

// Deepdive
const isFetchingDeepdive = ref<boolean>(true)

const tabs = computed(() => {
    return company?.value?.tabs ?? {}
})

const canAccess = (routeName: string): boolean => {
    switch (routeName) {
        case 'Company-detail-highlights':
        case 'Company-detail-news':
            return true
        case 'Company-detail-net-sales':
            return !!tabs.value['netsales'] && !isFetchingDeepdive.value
        case 'Company-detail-profitability':
            return !!tabs.value['profitability'] && !isFetchingDeepdive.value
        case 'Company-detail-returns':
            return !!tabs.value['returns'] && !isFetchingDeepdive.value
        case 'Company-detail-investments':
            return !!tabs.value['investments'] && !isFetchingDeepdive.value
        case 'Company-detail-financial-health':
            return !!tabs.value['financial-health'] && !isFetchingDeepdive.value
        case 'Company-detail-concern':
            return !!tabs.value['concern']
        case 'Company-detail-key-ratios':
            return !!tabs.value['key-ratios']
        case 'Company-detail-reports':
            return !!tabs.value['reports']
        case 'Company-detail-export':
            return true
        default:
            return false
    }
}