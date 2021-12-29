import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import MuiTableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { withStyles } from '@mui/styles'

const TableHead = withStyles(() => ({
	root: {
		backgroundColor: '#F0F0F0',
	},
}))(MuiTableHead)

const TableHeaderCell = withStyles(() => ({
	root: {
		color: '#000000',
	},
}))(TableCell)

class PeopleTable extends React.Component {
	constructor(props) {
		super(props)
		this.state = { people: this.props.people, selectedRow: '' }
	}

	render() {
		return (
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableHeaderCell>Name</TableHeaderCell>
							<TableHeaderCell align='justify'>Party</TableHeaderCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{this.props.people.data &&
							this.props.people.data.results.map((row) => (
								<TableRow
									selected={this.state.selectedRow === row.name}
									hover
									key={row.name}
									onClick={() => {
										this.setState({ selectedRow: row.name })
										this.props.onClickFun(row.name)
									}}
								>
									<TableCell component='th' scope='row'>
										{row.name}
									</TableCell>
									<TableCell align='justify'>{row.party.charAt(0)}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		)
	}
}
export default PeopleTable
