import { PlanData, AddsData } from '@/types/FormTypes'

// Plan pricing
export const getPlanPrice = (
	plan: 'arcade' | 'advanced' | 'pro',
	isYearly: boolean
): number => {
	const prices = {
		arcade: isYearly ? 90 : 9,
		advanced: isYearly ? 120 : 12,
		pro: isYearly ? 150 : 15,
	}

	return prices[plan]
}

// Add-on pricing
export const getAddOnPrice = (
	addOn: keyof AddsData,
	isYearly: boolean
): number => {
	const prices = {
		onlineService: isYearly ? 10 : 1,
		largerStorage: isYearly ? 20 : 2,
		customizableProfile: isYearly ? 20 : 2,
	}

	return prices[addOn]
}

// Calculate total price
export const calculateTotalPrice = (
	planData: PlanData,
	addsData: AddsData
): number => {
	let total = getPlanPrice(planData.plan, planData.isYearly)

	// Add prices for selected add-ons
	Object.entries(addsData).forEach(([key, isSelected]) => {
		if (isSelected) {
			total += getAddOnPrice(key as keyof AddsData, planData.isYearly)
		}
	})

	return total
}

// Format plan name for display
export const formatPlanName = (plan: string): string => {
	return plan.charAt(0).toUpperCase() + plan.slice(1)
}

// Get billing cycle text
export const getBillingCycle = (isYearly: boolean): string => {
	return isYearly ? 'Yearly' : 'Monthly'
}

// Get billing abbreviation
export const getBillingAbbr = (isYearly: boolean): string => {
	return isYearly ? 'yr' : 'mo'
}
