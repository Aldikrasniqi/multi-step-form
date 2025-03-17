'use client'
import { useFormContext } from '../../context/FormContext'
import { useState, useEffect } from 'react'
import {
	getPlanPrice,
	getAddOnPrice,
	calculateTotalPrice,
	formatPlanName,
	getBillingCycle,
	getBillingAbbr,
} from '@/lib/pricing'

export default function Final() {
	const { formData, setCurrentStep } = useFormContext()
	const { plan, adds } = formData
	const [totalPrice, setTotalPrice] = useState(0)

	const selectedPlan = formatPlanName(plan.plan)
	const billingCycle = getBillingCycle(plan.isYearly)
	const billingAbbr = getBillingAbbr(plan.isYearly)

	useEffect(() => {
		const calculatedPrice = calculateTotalPrice(plan, adds)
		if (totalPrice !== calculatedPrice) {
			setTotalPrice(calculatedPrice)
		}
	}, [
		plan.plan,
		plan.isYearly,
		adds.onlineService,
		adds.largerStorage,
		adds.customizableProfile,
	])

	const handlePlanChange = () => {
		setCurrentStep(2)
	}

	return (
		<div className="flex flex-col gap-4 max-w-2xl">
			<h1 className="text-4xl font-bold text-marine-blue">Finishing up</h1>
			<p className="text-cool-gray text-lg">
				Double-check everything looks OK before confirming.
			</p>
			<div className="bg-alabaster p-6 rounded-lg">
				<div className="flex flex-row justify-between border-b border-light-gray pb-6 items-center">
					<div>
						<h4 className="text-marine-blue text-lg font-medium">
							{selectedPlan} ({billingCycle})
						</h4>
						<button
							onClick={handlePlanChange}
							className="underline text-cool-gray font-medium text-sm cursor-pointer"
						>
							Change
						</button>
					</div>
					<p className="text-marine-blue font-medium">
						${getPlanPrice(plan.plan, plan.isYearly)}/{billingAbbr}
					</p>
				</div>

				{adds.onlineService && (
					<div className="flex flex-row justify-between pt-6">
						<p className="text-cool-gray">Online service</p>
						<p className="text-marine-blue font-medium text-sm">
							+${getAddOnPrice('onlineService', plan.isYearly)}/{billingAbbr}
						</p>
					</div>
				)}

				{adds.largerStorage && (
					<div className="flex flex-row justify-between pt-6">
						<p className="text-cool-gray">Larger storage</p>
						<p className="text-marine-blue font-medium text-sm">
							+${getAddOnPrice('largerStorage', plan.isYearly)}/{billingAbbr}
						</p>
					</div>
				)}

				{adds.customizableProfile && (
					<div className="flex flex-row justify-between pt-6">
						<p className="text-cool-gray">Customizable profile</p>
						<p className="text-marine-blue font-medium text-sm">
							+${getAddOnPrice('customizableProfile', plan.isYearly)}/
							{billingAbbr}
						</p>
					</div>
				)}
			</div>
			<div className="flex flex-row justify-between p-8">
				<span className="text-cool-gray">
					Total (per {plan.isYearly ? 'year' : 'month'})
				</span>
				<span className="text-purplish-blue font-semibold text-xl">
					${totalPrice}/{billingAbbr}
				</span>
			</div>
		</div>
	)
}
