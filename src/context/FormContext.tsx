'use client'
import { createContext, useContext, useState, ReactNode } from 'react'
import {
	FormData,
	FormContextType,
	PersonalInfoData,
	PlanData,
	AddsData,
} from '@/types/FormTypes'

const initialFormData: FormData = {
	personalInfo: {
		name: '',
		email: '',
		phone: '',
	},
	plan: {
		plan: 'arcade',
		isYearly: false,
	},
	adds: {
		onlineService: false,
		largerStorage: false,
		customizableProfile: false,
	},
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export function FormProvider({ children }: { children: ReactNode }) {
	const [currentStep, setCurrentStep] = useState(1)
	const [formData, setFormData] = useState<FormData>(initialFormData)
	const [formErrors, setFormErrors] = useState<{ [key: string]: boolean }>({
		personalInfo: false,
		plan: false,
		adds: false,
	})
	const [isCompleted, setIsCompleted] = useState(false)

	const validatePersonalInfo = (data: PersonalInfoData): boolean => {
		const { name, email, phone } = data

		if (!name.trim() || !email.trim() || !phone.trim()) {
			return false
		}

		if (!/^\S+@\S+\.\S+$/.test(email)) {
			return false
		}

		if (!/^\d{10,}$/.test(phone.replace(/[^0-9]/g, ''))) {
			return false
		}

		return true
	}

	const handleNext = () => {
		if (currentStep === 1) {
			const isValid = validatePersonalInfo(formData.personalInfo)

			if (!isValid) {
				setFormErrors((prev) => ({ ...prev, personalInfo: true }))
				return
			}

			setFormErrors((prev) => ({ ...prev, personalInfo: false }))
		}

		if (currentStep < 4) {
			setCurrentStep(currentStep + 1)
		}
	}

	const handleBack = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1)
		}
	}

	const handleComplete = () => {
		// Log the final form data
		console.log('Form completed with data:', formData)

		// Set form as completed and move to thank you page (step 5)
		setIsCompleted(true)
		setCurrentStep(5)
	}

	const updatePersonalInfo = (data: PersonalInfoData) => {
		setFormData((prev) => ({
			...prev,
			personalInfo: data,
		}))
	}

	const updatePlan = (data: PlanData) => {
		setFormData((prev) => ({
			...prev,
			plan: data,
		}))
	}

	const updateAdds = (data: AddsData) => {
		setFormData((prev) => ({
			...prev,
			adds: data,
		}))
	}

	return (
		<FormContext.Provider
			value={{
				currentStep,
				setCurrentStep,
				handleNext,
				handleBack,
				handleComplete,
				formData,
				formErrors,
				updatePersonalInfo,
				updatePlan,
				updateAdds,
				isCompleted,
			}}
		>
			{children}
		</FormContext.Provider>
	)
}

export function useFormContext() {
	const context = useContext(FormContext)
	if (context === undefined) {
		throw new Error('useFormContext must be used within a FormProvider')
	}
	return context
}
