export const toSentenceCase = (text: string, split?: string) => {
	return text
		.split(split ?? '_')
		.reduce<string[]>((acc, str) => {
			if (str.length > 0) {
				return [...acc, str.charAt(0).toUpperCase() + str.toLowerCase().slice(1)]
			}
			return [...acc]
		}, [])
		.join(' ')
}

export const camelCaseToSentenceCase = (text: string) => {
	return text
		.split(/(?=[A-Z])/)
		.reduce<string[]>((acc, str) => {
			if (str.length > 0) {
				return [...acc, str.charAt(0).toUpperCase() + str.toLowerCase().slice(1)]
			}
			return [...acc]
		}, [])
		.join(' ')
}

export const isString = (value: any): value is string => {
	return typeof value === 'string' || value instanceof String
}
