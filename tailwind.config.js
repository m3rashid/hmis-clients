/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{tsx,jsx,js}', './public/index.html'],
	theme: {
		screens: {
			'sm': '576px',
			'md': '640px',
			'lg': '768px',
			'xl': '1024px',
			'2xl': '1280px',
			'3xl': '1536px',
		}
	},
	plugins: [],
}
