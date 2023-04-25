import { Input } from 'antd'
import { useId } from 'react'

const CustomColorWidget = (props: any) => {
	const id = useId()
	console.log(props)

	return (
		<label htmlFor={`${id} color-picker`}>
			<div className='h-14 w-14'>
				<Input
					id={`${id} color-picker`}
					type='color'
					onChange={e => {
						console.log(e.target.value)
						props.onChange(e.target.value)
					}}
					defaultValue={props.value}
					className='border-none outline-none p-0 m-0 h-full w-full'
					style={{ backgroundColor: props.value }}
					styles={{ input: { height: 0, width: 0 } }}
					bordered={false}
				/>
			</div>
		</label>
	)
}

export default CustomColorWidget
