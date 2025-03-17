export type Plan = {
	name: string
	price: number
	icon: string
	selected: boolean
	billing: 'mo' | 'yr' | string
	discount: number
}
