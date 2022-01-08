import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

function TextBox(props) {
	return (
		<Grid key={props.name} item>
			<TextField
				name={props.name}
				native='true'
				value={props.value}
				id='filled-basic'
				label={props.label}
				variant='filled'
				inputProps={{ readOnly: true }}
				multiline
				fullWidth
			/>
		</Grid>
	)
}

function PersonInfo(props) {
	return (
		<Grid container direction='column' spacing={{ xs: 2, md: 3 }}>
			{props.infoFields.map((field) => (
				<TextBox key={field.name} name={field.name} label={field.label} value={field.value} />
			))}
			<Grid item>
				<Button fullWidth size='large' target='_blank' variant='contained' href={props.websiteLink} disabled={props.websiteLink < 1}>
					Website
				</Button>
			</Grid>
		</Grid>
	)
}
export default PersonInfo
