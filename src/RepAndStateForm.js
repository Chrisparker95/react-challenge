import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

let states = [
	'AL',
	'AK',
	'AS',
	'AZ',
	'AR',
	'CA',
	'CO',
	'CT',
	'DE',
	'DC',
	'FL',
	'GA',
	'GU',
	'HI',
	'ID',
	'IL',
	'IN',
	'IA',
	'KS',
	'KY',
	'LA',
	'ME',
	'MD',
	'MA',
	'MI',
	'MN',
	'MS',
	'MO',
	'MT',
	'NE',
	'NV',
	'NH',
	'NJ',
	'NM',
	'NY',
	'NC',
	'ND',
	'MP',
	'OH',
	'OK',
	'OR',
	'PA',
	'PR',
	'RI',
	'SC',
	'SD',
	'TN',
	'TX',
	'UT',
	'VT',
	'VI',
	'VA',
	'WA',
	'WV',
	'WI',
	'WY',
]

let repTypes = ['Representatives', 'Senators']

function SelectComp(props) {
	return (
		<Select name={props.name} native value={props.value} id={props.id} label={props.label} onChange={props.changeFun}>
			{props.values.map((value) => (
				<option key={value} value={value}>
					{value}
				</option>
			))}
		</Select>
	)
}

function RepAndStateForm(props) {
	const [repType, setRepType] = useState('Representatives')
	const [state, setState] = useState('AL')

	const handleRepTypeChange = (e) => {
		setRepType(e.target.value)
	}
	const handleStateChange = (e) => {
		setState(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		props.updateInput(repType, state)
	}

	return (
		<form onSubmit={handleSubmit}>
			<FormControl sx={{ m: 1, minWidth: 120 }}>
				<InputLabel htmlFor='rep-select'>Rep Type</InputLabel>
				<SelectComp name='repType' value={repType} id='rep-select' label='Rep Type' changeFun={handleRepTypeChange} values={repTypes} />
			</FormControl>
			<FormControl sx={{ m: 1, minWidth: 120 }}>
				<InputLabel htmlFor='state-select'>State</InputLabel>
				<SelectComp name='state' value={state} id='state-select' label='State' changeFun={handleStateChange} values={states} />
			</FormControl>
			<FormControl sx={{ m: 1, minWidth: 120 }}>
				<Button size='large' variant='contained' color='primary' type='submit'>
					Submit
				</Button>
			</FormControl>
		</form>
	)
}

export default RepAndStateForm
