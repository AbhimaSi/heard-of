import { useState, useContext } from 'react';
import AuthContext from '../contexts/Auth.jsx';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import ErrorMessage from './Error'

function Login({ display }){
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const { verifyToken } = useContext(AuthContext);

    const openDialog = () => {
        setOpen(true);
    }
    const closeDialog = () => {
        setError('');
        setOpen(false);
    }

    const realizeLogin = async () => {
        const user = {
            name: name,
            password: pass,
        }
        try{
            if(!user.name || !user.password){
                throw new Error('Required fields are empty.')
            }
            let res = await fetch("https://localhost:3000/login", {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(user),
                credentials: 'include',
            })
            if (!res.ok){
                const error = (await res.json()).error
                throw new Error(error);
            }
            res = await res.json();
            closeDialog();
            await verifyToken();
        }
        catch(err){
            setError(err.message);
        }
    }

    return (
        <>
            <Button onClick={openDialog}
                variant="outlined"
                sx={{
                    display: display,
                    fontSize: '15px',
                    borderColor: 'white',
                    color:'white',
                    margin: '20px',
                    marginRight: '10px',
                    width: '7%',
                }}>
            Login</Button>
            <Dialog open={open} onClose={closeDialog}>
                <DialogTitle>Login to account
                </DialogTitle>
                <DialogContent>
                    <form id="login-form">
                        <label>Name</label>
                        <input type="text" id="username-form" onChange={(e) => {setName(e.target.value)}}/>
                        <label>Password</label>
                        <input type="password" id="password-form" onChange={(e) => {setPass(e.target.value)}}/>
                        <Button variant="outlined" sx={{color:"purple"}} onClick={realizeLogin}>Login</Button>
                    </form>
                    <ErrorMessage className="error">{error}</ErrorMessage>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Login;