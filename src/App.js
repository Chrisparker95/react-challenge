import * as React from 'react'
import Grid from '@mui/material/Grid'
import RepAndStateForm from './RepAndStateForm'
import PeopleTable from './peopleTable'
import PersonInfo from './personInfo'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'

const axios = require('axios')

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			repType: '',
			state: '',
			people: [],
			infoFields: [
				{ name: 'firstName', label: 'First Name', value: '' },
				{ name: 'lastName', label: 'Last Name', value: '' },
				{ name: 'district', label: 'District', value: '' },
				{ name: 'phone', label: 'Phone', value: '' },
				{ name: 'office', label: 'Office', value: '' },
			],
			errorMsg: '',
			websiteLink: '',
			disableWebsiteBtn: true,
		}
	}

	updateInput = (newRep, newState) => {
		this.setState(
			{
				repType: newRep,
				state: newState,
				//clear extra info fields when getting a new list
				infoFields: [
					{ name: 'firstName', label: 'First Name', value: '' },
					{ name: 'lastName', label: 'Last Name', value: '' },
					{ name: 'district', label: 'District', value: '' },
					{ name: 'phone', label: 'Phone', value: '' },
					{ name: 'office', label: 'Office', value: '' },
				],
				websiteLink: '',
				disableWebsiteBtn: true,
			},
			() => {
				this.GetData()
			}
		)
	}
	populateExtraInfo = (name) => {
		let extraInfo = this.state.people.data.results.filter((person) => {
			return person.name === name
		})
		let splitNames = extraInfo[0].name.split(' ')
		this.setState({
			infoFields: [
				{ name: 'firstName', label: 'First Name', value: splitNames[0] },
				{ name: 'lastName', label: 'Last Name', value: splitNames[splitNames.length - 1] },
				{ name: 'district', label: 'District', value: extraInfo[0].district },
				{ name: 'phone', label: 'Phone', value: extraInfo[0].phone },
				{ name: 'office', label: 'Office', value: extraInfo[0].office },
			],
			websiteLink: extraInfo[0].link,
			disableWebsiteBtn: false,
		})
	}

	GetData = () => {
		axios
			.get(`//localhost:4000/${this.state.repType}/${this.state.state}`)
			.then((response) => {
				if (response.data.success) {
					this.setState({ people: response, errorMsg: '' })
				} else {
					this.setState({ people: [], errorMsg: response.data.error })
				}
			})
			.catch((error) => {
				if (!error.response) {
					// network error
					this.setState({ people: [], errorMsg: 'Network error, please try again.' })
				} else {
					this.setState({ people: [], errorMsg: 'There was a problem with your request, please try again.' })
				}
			})
	}

	render() {
		return (
			<Grid container direction='column' spacing={{ xs: 2, md: 3 }} p={3} sx={{ maxWidth: 800 }}>
				{this.state.errorMsg && (
					<Grid item>
						<Alert severity='error'>{this.state.errorMsg}</Alert>
					</Grid>
				)}
				<Grid item>
					<Typography color='#1976d2' variant='h4'>
						Who's My Representative?
					</Typography>
				</Grid>
				<Grid item>
					<RepAndStateForm repType={this.state.repType} state={this.state.state} updateInput={this.updateInput} />
				</Grid>

				<Grid container item direction='row' spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
					<Grid container item direction='column' xs={2} sm={4} md={6}>
						<Grid item>
							<Typography display='inline' color='#000000' variant='h5'>
								List /{' '}
							</Typography>
							<Typography display='inline' color='#1976d2' variant='h5'>
								{this.state.repType}
							</Typography>
						</Grid>
						<Grid item>
							<PeopleTable people={this.state.people} onClickFun={this.populateExtraInfo} />
						</Grid>
					</Grid>
					<Grid container item direction='column' xs={2} sm={4} md={6}>
						<Grid item>
							<Typography variant='h5'>Info</Typography>
						</Grid>
						<Grid item>
							<PersonInfo infoFields={this.state.infoFields} websiteLink={this.state.websiteLink} disableWebsiteBtn={this.state.disableWebsiteBtn} />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		)
	}
}

export default App
