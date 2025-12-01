import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import { useContext } from 'react'
import ContentContext from '../contexts/Content';

function Profile({ display, size }){
    const { renderSearch, renderProfile } = useContext(ContentContext);
    return (
        <IconButton sx={{
            display: display,
            margin: '20px',
            padding: '2px',
        }} onClick={renderProfile}>
            <Avatar
                sx={{
                    backgroundColor:'darkmagenta',
                    width: size ? size : '40px',
                    height: size ? size : '40px',
                }}
            >U</Avatar>
        </IconButton>
    )
}

export default Profile;