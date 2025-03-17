import type { Metadata } from 'next'
import { Ubuntu } from 'next/font/google'
import './globals.css'
import { FormProvider } from '../context/FormContext'

const ubuntu = Ubuntu({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Multi-Step Form',
	description: 'A multi-step form built with Next.js and Tailwind CSS',
	viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${ubuntu.className} antialiased`}>
				<FormProvider>{children}</FormProvider>
			</body>
		</html>
	)
}
