import { ads as initialAds } from '@/lib/ads'
import { useState, useEffect } from 'react'
import { useFormContext } from '@/context/FormContext'
import { getBillingAbbr } from '@/lib/pricing'
import { AddsData } from '@/types/FormTypes'

export default function AddsInfo() {
	const { formData, updateAdds } = useFormContext()
	const { plan } = formData
	const [selectedAdds, setSelectedAdds] = useState<string[]>([])
	const [ads, setAds] = useState(initialAds)

	useEffect(() => {
		const selected: string[] = []
		if (formData.adds.onlineService) selected.push('Online service')
		if (formData.adds.largerStorage) selected.push('Larger storage')
		if (formData.adds.customizableProfile) selected.push('Customizable profile')

		if (JSON.stringify(selectedAdds) !== JSON.stringify(selected)) {
			setSelectedAdds(selected)
		}

		const updatedAds = initialAds.map((ad) => ({
			...ad,
			price: plan.isYearly ? ad.yearlyPrice : ad.monthlyPrice,
			billing: getBillingAbbr(plan.isYearly),
		}))

		setAds(updatedAds)
	}, [formData.plan.isYearly, formData.adds, plan.isYearly])

	const handleAddsChange = (add: string) => {
		const newSelectedAdds = selectedAdds.includes(add)
			? selectedAdds.filter((item) => item !== add)
			: [...selectedAdds, add]

		setSelectedAdds(newSelectedAdds)

		const addToKeyMap: Record<string, keyof AddsData> = {
			'Online service': 'onlineService',
			'Larger storage': 'largerStorage',
			'Customizable profile': 'customizableProfile',
		}

		updateAdds({
			onlineService: newSelectedAdds.includes('Online service'),
			largerStorage: newSelectedAdds.includes('Larger storage'),
			customizableProfile: newSelectedAdds.includes('Customizable profile'),
		})
	}

	return (
		<div className="flex flex-col md:gap-3 gap-5">
			<h1 className="text-4xl font-bold text-marine-blue">Pick add-ons</h1>
			<p className="text-cool-gray text-lg w-10/12 md:w-full">
				Add-ons help enhance your gaming experience.
			</p>
			<div
				className="flex flex-col gap-4 w-full"
				role="group"
				aria-label="Add-ons"
			>
				{ads.map((ad) => (
					<div
						key={ad.name}
						className={`w-full p-4.5 border border-light-gray rounded-lg cursor-pointer ${
							selectedAdds.includes(ad.name)
								? 'bg-alabaster border border-purplish-blue'
								: 'bg-white'
						}`}
						onClick={() => handleAddsChange(ad.name)}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								handleAddsChange(ad.name)
							}
						}}
						tabIndex={0}
						role="checkbox"
						aria-checked={selectedAdds.includes(ad.name)}
					>
						<div className="flex flex-row gap-4 items-center justify-between">
							<div className="flex flex-row gap-4 items-center">
								<Checkbox
									checked={selectedAdds.includes(ad.name)}
									onChange={() => handleAddsChange(ad.name)}
									id={`checkbox-${ad.name.toLowerCase().replace(/\s+/g, '-')}`}
									name={ad.name}
								/>
								<div>
									<h2 className="text-marine-blue text-lg font-bold">
										{ad.name}
									</h2>
									<p className="text-cool-gray text-sm">{ad.description}</p>
								</div>
							</div>
							<p className="text-purplish-blue text-sm">
								+${ad.price}/{ad.billing}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

interface CheckboxProps {
	checked: boolean
	onChange: () => void
	id: string
	name: string
}

function Checkbox({ checked, onChange, id, name }: CheckboxProps) {
	return (
		<div className="relative w-6 h-6">
			<input
				type="checkbox"
				id={id}
				name={name}
				checked={checked}
				onChange={onChange}
				className="peer appearance-none w-full h-full border border-light-gray rounded cursor-pointer checked:bg-purplish-blue checked:border-purplish-blue"
				aria-checked={checked}
			/>
			<svg
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-4 pointer-events-none hidden peer-checked:block"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="white"
				strokeWidth="4"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<polyline points="20 6 9 17 4 12"></polyline>
			</svg>
		</div>
	)
}
