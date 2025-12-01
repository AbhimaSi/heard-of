import Button from '@mui/material/Button'

function Register({ display }){
    return (
        <Button
            variant="outlined"
            sx={{
                display: display,
                fontSize: '15px',
                borderColor: 'white',
                color:'white',
                margin: '20px',
                marginLeft: '10px',
                width: '7%',
            }}>
        Register</Button>
    )
}

export default Register;