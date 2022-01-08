import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import RepAndStateForm from './RepAndStateForm'
import PeopleTable from './peopleTable'
import PersonInfo from './personInfo'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'

const axios = require('axios')
const apiURL = '//localhost:4000'

function App() {
	const [repType, setRepType] = useState('')
	const [state, setState] = useState('')
	const [people, setPeople] = useState([])
	const [infoFields, setInfoFields] = useState([
		{ name: 'firstName', label: 'First Name', value: '' },
		{ name: 'lastName', label: 'Last Name', value: '' },
		{ name: 'district', label: 'District', value: '' },
		{ name: 'phone', label: 'Phone', value: '' },
		{ name: 'office', label: 'Office', value: '' },
	])
	const [errorMsg, setErrorMsg] = useState('')
	const [websiteLink, setWebsiteLink] = useState('')

	const handleRepTypeChange = (value) => {
		setRepType(value)
	}
	const handleStateChange = (value) => {
		setState(value)
	}
	const handlePeopleChange = (value) => {
		setPeople(value)
	}
	const handleInfoFieldsChange = (value) => {
		setInfoFields(value)
	}
	const handleErrorMsgChange = (value) => {
		setErrorMsg(value)
	}
	const handleWebsiteLinkChange = (value) => {
		setWebsiteLink(value)
	}

	const updateInput = (newRep, newState) => {
		handleRepTypeChange(newRep)
		handleStateChange(newState)
		handleInfoFieldsChange([
			{ name: 'firstName', label: 'First Name', value: '' },
			{ name: 'lastName', label: 'Last Name', value: '' },
			{ name: 'district', label: 'District', value: '' },
			{ name: 'phone', label: 'Phone', value: '' },
			{ name: 'office', label: 'Office', value: '' },
		])

		handleWebsiteLinkChange('')
		GetData(newRep, newState)
	}

	const populateExtraInfo = (name) => {
		let extraInfo = people.data.results.filter((person) => {
			return person.name === name
		})
		let splitNames = extraInfo[0].name.split(' ')

		handleInfoFieldsChange([
			{ name: 'firstName', label: 'First Name', value: splitNames[0] },
			{ name: 'lastName', label: 'Last Name', value: splitNames[splitNames.length - 1] },
			{ name: 'district', label: 'District', value: extraInfo[0].district },
			{ name: 'phone', label: 'Phone', value: extraInfo[0].phone },
			{ name: 'office', label: 'Office', value: extraInfo[0].office },
		])

		handleWebsiteLinkChange(extraInfo[0].link)
	}

	const GetData = (newRep, newState) => {
		axios
			.get(`${apiURL}/${newRep}/${newState}`)
			.then((response) => {
				if (response.data.success) {
					handlePeopleChange(response)
					handleErrorMsgChange('')
				} else {
					handlePeopleChange([])
					handleErrorMsgChange(response.data.error)
				}
			})
			.catch((error) => {
				if (!error.response) {
					// network error
					handlePeopleChange([])
					handleErrorMsgChange('Network error, please try again.')
				} else {
					handlePeopleChange([])
					handleErrorMsgChange('There was a problem with your request, please try again.')
				}
			})
	}

	return (
		<Grid container direction='column' spacing={{ xs: 2, md: 3 }} p={3} sx={{ maxWidth: 800 }}>
			{errorMsg && (
				<Grid item>
					<Alert severity='error'>{errorMsg}</Alert>
				</Grid>
			)}
			<Grid item>
				<Typography color='#1976d2' variant='h4'>
					Who's My Representative?
				</Typography>
			</Grid>
			<Grid item>
				<RepAndStateForm repType={repType} state={state} updateInput={updateInput} />
			</Grid>

			<Grid container item direction='row' spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
				<Grid container item direction='column' xs={2} sm={4} md={6}>
					<Grid item>
						<Typography display='inline' color='#000000' variant='h5'>
							List /{' '}
						</Typography>
						<Typography display='inline' color='#1976d2' variant='h5'>
							{repType}
						</Typography>
					</Grid>
					<Grid item>
						<PeopleTable people={people} onClickFun={populateExtraInfo} />
					</Grid>
				</Grid>
				<Grid container item direction='column' xs={2} sm={4} md={6}>
					<Grid item>
						<Typography variant='h5'>Info</Typography>
					</Grid>
					<Grid item>
						<PersonInfo infoFields={infoFields} websiteLink={websiteLink} />
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default App
