'use client'

import Image from 'next/image'

export default function ThankYou() {
	return (
		<div className="h-full w-full flex flex-col items-center justify-center text-center gap-6 md:gap-6 p-10 max-w-md mx-auto">
			<Image
				src="/images/icon-thank-you.svg"
				alt="Thank you"
				width={80}
				height={80}
				className="md:w-20 md:h-20 w-16 h-16"
			/>

			<h1 className="text-4xl font-bold text-marine-blue">Thank you!</h1>

			<p className="text-cool-gray text-lg w-11/12 md:w-full">
				Thanks for confirming your subscription! We hope you have fun using our
				platform. If you ever need support, please feel free to email us at
				support@loremgaming.com.
			</p>
		</div>
	)
}
