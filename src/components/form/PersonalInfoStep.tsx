'use client'
import { useState, useEffect, useCallback } from 'react'
import { useFormContext } from '../../context/FormContext'

export default function PersonalInfo() {
	const { formData, updatePersonalInfo, formErrors, currentStep } =
		useFormContext()
	const [name, setName] = useState(formData.personalInfo.name)
	const [email, setEmail] = useState(formData.personalInfo.email)
	const [phone, setPhone] = useState(formData.personalInfo.phone)
	const [errors, setErrors] = useState({
		name: '',
		email: '',
		phone: '',
	})
	const [showErrors, setShowErrors] = useState(false)

	const validateInputs = useCallback(() => {
		const newErrors = {
			name: '',
			email: '',
			phone: '',
		}

		if (!name.trim()) {
			newErrors.name = 'Name is required'
		}

		if (!email.trim()) {
			newErrors.email = 'Email is required'
		} else if (!/^\S+@\S+\.\S+$/.test(email)) {
			newErrors.email = 'Please enter a valid email'
		}

		if (!phone.trim()) {
			newErrors.phone = 'Phone number is required'
		} else if (!/^\d{10,}$/.test(phone.replace(/[^0-9]/g, ''))) {
			newErrors.phone = 'Please enter a valid phone number'
		}

		setErrors(newErrors)
		return !newErrors.name && !newErrors.email && !newErrors.phone
	}, [name, email, phone])

	useEffect(() => {
		const timer = setTimeout(() => {
			updatePersonalInfo({ name, email, phone })
		}, 300)

		return () => clearTimeout(timer)
	}, [name, email, phone, updatePersonalInfo])

	useEffect(() => {
		if (showErrors) {
			validateInputs()
		}
	}, [showErrors, validateInputs])

	useEffect(() => {
		if (formErrors.personalInfo && currentStep === 1) {
			setShowErrors(true)
		}
	}, [formErrors.personalInfo, currentStep])

	return (
		<div className="flex flex-col gap-5 md:gap-4 lg:pt-0 md:pt-10 px-3 py-6">
			<h1 className="text-4xl font-bold text-marine-blue">Personal Info</h1>
			<p className="text-cool-gray text-lg w-11/12 md:w-full">
				Please provide your name, email address, and phone number.
			</p>
			<form className="flex flex-col gap-3 md:gap-4 w-full">
				<div className="flex flex-col gap-1 md:gap-2">
					<div className="flex justify-between">
						<label
							htmlFor="name"
							className="text-marine-blue text-xs md:text-sm font-medium"
						>
							Name
						</label>
						{showErrors && errors.name && (
							<span className="text-strawberry-red text-xs md:text-sm font-semibold">
								{errors.name}
							</span>
						)}
					</div>
					<input
						type="text"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className={`border ${
							showErrors && errors.name
								? 'border-strawberry-red'
								: 'border-light-gray'
						} rounded-md py-2 md:py-3 px-3 md:px-4 text-marine-blue text-sm md:text-base font-medium`}
						placeholder="e.g. Stephen King"
						aria-label="Name"
						aria-required="true"
						aria-invalid={showErrors && errors.name ? 'true' : 'false'}
					/>
				</div>
				<div className="flex flex-col gap-1 md:gap-2">
					<div className="flex justify-between">
						<label
							htmlFor="email"
							className="text-marine-blue text-xs md:text-sm font-medium"
						>
							Email Address
						</label>
						{showErrors && errors.email && (
							<span className="text-strawberry-red text-xs md:text-sm font-semibold">
								{errors.email}
							</span>
						)}
					</div>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className={`border ${
							showErrors && errors.email
								? 'border-strawberry-red'
								: 'border-light-gray'
						} rounded-md py-2 md:py-3 px-3 md:px-4 text-marine-blue text-sm md:text-base font-medium`}
						placeholder="e.g. stephenking@lorem.com"
						aria-label="Email Address"
						aria-required="true"
						aria-invalid={showErrors && errors.email ? 'true' : 'false'}
					/>
				</div>
				<div className="flex flex-col gap-1 md:gap-2">
					<div className="flex justify-between">
						<label
							htmlFor="phone"
							className="text-marine-blue text-xs md:text-sm font-medium"
						>
							Phone Number
						</label>
						{showErrors && errors.phone && (
							<span className="text-strawberry-red text-xs md:text-sm font-semibold">
								{errors.phone}
							</span>
						)}
					</div>
					<input
						type="tel"
						id="phone"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						className={`border ${
							showErrors && errors.phone
								? 'border-strawberry-red'
								: 'border-light-gray'
						} rounded-md py-2 md:py-3 px-3 md:px-4 text-marine-blue text-sm md:text-base font-medium`}
						placeholder="e.g. +1 234 567 890"
						aria-label="Phone Number"
						aria-required="true"
						aria-invalid={showErrors && errors.phone ? 'true' : 'false'}
					/>
				</div>
			</form>
		</div>
	)
}
