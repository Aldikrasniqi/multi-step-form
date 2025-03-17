'use client'
import StepsCard from './form/StepsCard'
import { steps } from '../lib/steps'
import PersonalInfo from './form/PersonalInfoStep'
import PlanSelect from './form/PlanSelectionStep'
import AddsInfo from './form/AddOnsSelectionStep'
import Final from './form/ConfirmationStep'
import ThankYou from './form/ThankYou'
import { useFormContext } from '../context/FormContext'

export default function Container() {
	const { currentStep, handleNext, handleBack, handleComplete, formErrors } =
		useFormContext()

	return (
		<div className="relative min-h-screen w-full bg-magnolia md:flex md:items-center md:justify-center">
			<div className="absolute top-0 left-0 right-0 h-[172px] bg-[url('/images/bg-sidebar-mobile.svg')] bg-no-repeat bg-cover md:hidden z-0"></div>

			<div className="container mx-auto md:bg-white md:rounded-2xl md:shadow-xl md:h-3/4 w-full md:w-[1100px] md:p-4">
				<div className="w-full h-full md:grid md:grid-cols-3 md:justify-between md:items-center md:gap-4">
					<div
						className="flex justify-center gap-4 py-8 md:hidden z-20 relative"
						role="navigation"
						aria-label="Form steps"
					>
						<ol className="flex justify-center gap-4">
							{steps.map((step) => (
								<li
									key={step.step}
									className={`flex items-center justify-center w-10 h-10 rounded-full ${
										step.step === currentStep && currentStep < 5
											? 'bg-light-blue text-black'
											: currentStep === 5 && step.step === 4
											? 'bg-light-blue text-black'
											: 'bg-transparent border border-white text-white'
									}`}
									aria-current={step.step === currentStep ? 'step' : undefined}
								>
									<span className="font-bold">{step.step}</span>
								</li>
							))}
						</ol>
					</div>

					<div className="hidden md:block col-span-1 w-full relative">
						<img
							src="/images/bg-sidebar-desktop.svg"
							alt="sidebar"
							className="lg:h-[617px]"
						/>
						<div
							className="absolute top-0 left-0 flex flex-col gap-7 px-8 py-13"
							role="navigation"
							aria-label="Form steps"
						>
							<ol className="flex flex-col gap-7">
								{steps.map((step) => (
									<li key={step.step}>
										<StepsCard
											step={step.step}
											title={step.title}
											description={step.description}
											active={step.step === currentStep && currentStep < 5}
											completed={currentStep === 5 && step.step === 4}
										/>
									</li>
								))}
							</ol>
						</div>
					</div>

					<div className="md:col-span-2 h-full w-full md:px-0 md:py-12 flex flex-col justify-center">
						<div className="bg-white rounded-lg shadow-lg md:shadow-none p-5 md:p-0 mx-4 mt-16 md:mt-0 mb-24 md:mb-0 z-10 relative ">
							{currentStep === 1 && <PersonalInfo />}
							{currentStep === 2 && <PlanSelect />}
							{currentStep === 3 && <AddsInfo />}
							{currentStep === 4 && <Final />}
							{currentStep === 5 && <ThankYou />}
						</div>

						{currentStep < 5 && (
							<div className="fixed bottom-0 left-0 right-0 bg-white p-4 flex justify-between md:static md:mt-8 md:pr-14 md:p-0 shadow-lg md:shadow-none">
								{currentStep > 1 ? (
									<button
										onClick={handleBack}
										className="px-4 py-2 text-cool-gray font-medium cursor-pointer hover:text-marine-blue transition-colors"
										aria-label="Go back to previous step"
									>
										Go Back
									</button>
								) : (
									<div></div>
								)}

								{currentStep < 4 ? (
									<button
										onClick={handleNext}
										className={`px-4 py-2 bg-marine-blue cursor-pointer text-white rounded-md ml-auto hover:opacity-90 transition-opacity`}
										aria-label="Proceed to next step"
									>
										Next Step
									</button>
								) : (
									<button
										onClick={handleComplete}
										className="px-4 py-2 bg-purplish-blue text-white rounded-md ml-auto cursor-pointer hover:opacity-90 transition-opacity"
										aria-label="Confirm and complete form"
									>
										Confirm
									</button>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
