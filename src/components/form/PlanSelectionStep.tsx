import { plans as initialPlans } from '@/lib/plans'
import { Plan } from '@/types/Plan'
import { useState, useEffect } from 'react'
import { useFormContext } from '@/context/FormContext'
import { getPlanPrice, getBillingAbbr } from '@/lib/pricing'
import { PlanData } from '@/types/FormTypes'

export default function PlanSelect() {
	const { formData, updatePlan } = useFormContext()
	const [plans, setPlans] = useState<Plan[]>(initialPlans)
	const [isYearly, setIsYearly] = useState(formData.plan.isYearly)

	useEffect(() => {
		const updatedPlans = initialPlans.map((plan) => {
			const planName = plan.name.toLowerCase() as PlanData['plan']
			return {
				...plan,
				selected: planName === formData.plan.plan,
				billing: getBillingAbbr(formData.plan.isYearly),
				price: getPlanPrice(planName, formData.plan.isYearly),
			}
		})
		setPlans(updatedPlans)
	}, [formData.plan.plan, formData.plan.isYearly])

	const handlePlanSelect = (selectedPlan: Plan) => {
		const updatedPlans = plans.map((plan) =>
			plan.name === selectedPlan.name
				? { ...plan, selected: true }
				: { ...plan, selected: false }
		)

		setPlans(updatedPlans)

		const selectedPlanData = updatedPlans.find((plan) => plan.selected)
		if (selectedPlanData) {
			const planName = selectedPlanData.name.toLowerCase() as PlanData['plan']
			updatePlan({
				plan: planName,
				isYearly: isYearly,
			})
		}
	}

	const handleBillingSwitch = () => {
		const newIsYearly = !isYearly
		setIsYearly(newIsYearly)

		const updatedPlans = plans.map((plan) => {
			const planName = plan.name.toLowerCase() as PlanData['plan']
			return {
				...plan,
				price: getPlanPrice(planName, newIsYearly),
				billing: getBillingAbbr(newIsYearly),
			}
		})

		setPlans(updatedPlans)

		const selectedPlan = updatedPlans.find((plan) => plan.selected)
		if (selectedPlan) {
			const planName = selectedPlan.name.toLowerCase() as PlanData['plan']
			updatePlan({
				plan: planName,
				isYearly: newIsYearly,
			})
		} else {
			updatePlan({
				plan: 'arcade',
				isYearly: newIsYearly,
			})
		}
	}

	return (
		<div className="flex flex-col md:gap-4 gap-5 lg:mr-10">
			<h1 className="text-4xl font-bold text-marine-blue">Select your plan</h1>
			<p className="text-cool-gray text-lg w-10/12 md:w-full">
				You have the option of monthly or yearly billing.
			</p>
			<div className="grid lg:grid-cols-3 gap-4 lg:pt-6">
				{plans.map((plan) => (
					<div
						key={plan.name}
						className={`flex md:flex-col md:items-start md:gap-10 gap-4  rounded-lg p-3 border cursor-pointer ${
							plan.selected
								? 'border-purplish-blue bg-alabaster'
								: 'border-light-gray hover:border-purplish-blue bg-white'
						}`}
						onClick={() => handlePlanSelect(plan)}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								handlePlanSelect(plan)
							}
						}}
						tabIndex={0}
						role="radio"
						aria-checked={plan.selected}
					>
						<img src={plan.icon} alt={plan.name} />
						<div className="flex flex-col gap-1">
							<h2 className="text-marine-blue text-lg font-bold">
								{plan.name}
							</h2>
							<p className="text-cool-gray">
								${plan.price}/{plan.billing}
							</p>
							{isYearly && (
								<p className="text-marine-blue text-sm">
									{plan.discount} months free
								</p>
							)}
						</div>
					</div>
				))}
			</div>
			<div className="w-full bg-alabaster rounded-lg px-3 py-4">
				<div className="flex flex-row gap-8 items-center justify-center">
					<p
						className={`text-cool-gray ${
							!isYearly ? 'font-bold text-marine-blue' : ''
						}`}
					>
						Monthly
					</p>
					<Switch isYearly={isYearly} onToggle={handleBillingSwitch} />
					<p
						className={`text-cool-gray ${
							isYearly ? 'font-bold text-marine-blue' : ''
						}`}
					>
						Yearly
					</p>
				</div>
			</div>
		</div>
	)
}

interface SwitchProps {
	isYearly: boolean
	onToggle: () => void
}

function Switch({ isYearly, onToggle }: SwitchProps) {
	return (
		<div
			className={`w-11 h-6 flex items-center rounded-full cursor-pointer transition-colors duration-200 bg-marine-blue`}
			onClick={onToggle}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					onToggle()
				}
			}}
			role="switch"
			aria-checked={isYearly}
			tabIndex={0}
		>
			<div
				className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ms-1 ${
					isYearly ? 'translate-x-5' : ''
				}`}
			/>
		</div>
	)
}
