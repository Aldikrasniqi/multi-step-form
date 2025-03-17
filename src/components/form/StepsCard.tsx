interface StepsCardProps {
	step: number
	title: string
	description: string
	active: boolean
	completed?: boolean
}

export default function StepsCard(props: StepsCardProps) {
	const { step, title, description, active, completed = false } = props

	return (
		<div
			className="flex items-center gap-4 font-ubuntu"
			role="listitem"
			aria-current={active ? 'step' : undefined}
		>
			<div
				className={`flex items-center justify-center w-10 h-10 rounded-full ${
					active
						? 'bg-light-blue text-black'
						: completed
						? 'bg-light-blue text-black'
						: 'bg-transparent border border-white text-white'
				}`}
				aria-hidden="true"
			>
				<span className="font-bold">{step}</span>
			</div>
			<div className="flex flex-col">
				<h2 className="text-light-gray font-light text-sm uppercase">
					{title}
				</h2>
				<p className="text-white uppercase font-bold text-sm tracking-wider">
					{description}
				</p>
			</div>
		</div>
	)
}
