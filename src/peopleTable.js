import React, { useState } from 'react'
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

function PeopleTable(props) {
	const [selectedRow, setSelectedRow] = useState('')

	const handleSelectedRowChange = (rowName) => {
		setSelectedRow(rowName)
	}

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
					{props.people.data &&
						props.people.data.results.map((row) => (
							<TableRow
								selected={selectedRow === row.name}
								hover
								key={row.name}
								onClick={() => {
									handleSelectedRowChange(row.name)
									props.onClickFun(row.name)
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

export default PeopleTable
