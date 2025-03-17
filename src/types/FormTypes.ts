export type PersonalInfoData = {
	name: string
	email: string
	phone: string
}

export type PlanData = {
	plan: 'arcade' | 'advanced' | 'pro'
	isYearly: boolean
}

export type AddsData = {
	onlineService: boolean
	largerStorage: boolean
	customizableProfile: boolean
}

export type FormData = {
	personalInfo: PersonalInfoData
	plan: PlanData
	adds: AddsData
}

export type FormContextType = {
	currentStep: number
	setCurrentStep: (step: number) => void
	handleNext: () => void
	handleBack: () => void
	handleComplete: () => void
	formData: FormData
	formErrors: { [key: string]: boolean }
	updatePersonalInfo: (data: PersonalInfoData) => void
	updatePlan: (data: PlanData) => void
	updateAdds: (data: AddsData) => void
	isCompleted: boolean
}
