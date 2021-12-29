import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

function TextBox(props) {
	return (
		<Grid key={props.name} item xs={2} sm={4} md={4}>
			<TextField
				name={props.name}
				native='true'
				value={props.value}
				id='filled-basic'
				label={props.label}
				variant='filled'
				inputProps={{ readOnly: true }}
				multiline
			/>
		</Grid>
	)
}

function PersonInfo(props) {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid container direction='column' spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
				{props.infoFields.map((field) => (
					<TextBox key={field.name} name={field.name} label={field.label} value={field.value} />
				))}
				<Grid item xs={2} sm={4} md={4}>
					<Button size='large' target='_blank' variant='contained' href={props.websiteLink} disabled={props.disableWebsite}>
						Website
					</Button>
				</Grid>
			</Grid>
		</Box>
	)
}
export default PersonInfo
