import * as React from 'react'
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

class RepAndStateForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = { repType: 'Representatives', state: 'AL' }

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value })
	}

	handleSubmit(event) {
		this.props.updateInput(this.state.repType, this.state.state)
		event.preventDefault()
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<FormControl sx={{ m: 1, minWidth: 120 }}>
					<InputLabel htmlFor='rep-select'>Rep Type</InputLabel>
					<SelectComp name='repType' value={this.state.repType} id='rep-select' label='Rep Type' changeFun={this.handleChange} values={repTypes} />
				</FormControl>
				<FormControl sx={{ m: 1, minWidth: 120 }}>
					<InputLabel htmlFor='state-select'>State</InputLabel>
					<SelectComp name='state' value={this.state.state} id='state-select' label='State' changeFun={this.handleChange} values={states} />
				</FormControl>
				<FormControl sx={{ m: 1, minWidth: 120 }}>
					<Button size='large' variant='contained' color='primary' type='submit'>
						Submit
					</Button>
				</FormControl>
			</form>
		)
	}
}

export default RepAndStateForm
