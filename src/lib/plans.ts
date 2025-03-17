import { Plan } from '@/types/Plan'

export const plans: Plan[] = [
	{
		name: 'Arcade',
		price: 9,
		icon: '/images/icon-arcade.svg',
		selected: false,
		billing: 'mo',
		discount: 2,
	},
	{
		name: 'Advanced',
		price: 12,
		icon: '/images/icon-advanced.svg',
		selected: false,
		billing: 'mo',
		discount: 2,
	},
	{
		name: 'Pro',
		price: 15,
		icon: '/images/icon-pro.svg',
		selected: false,
		billing: 'mo',
		discount: 2,
	},
]
