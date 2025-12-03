import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

function LikeButton({ song }) {
    const [ loading, setLoading ] = useState(false);
    const [ liked, setLiked ] = useState(false);

    const payload = { song: song }

    const addSong = async() => {
        const res = await fetch('https://localhost:3000/user/song', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            credentials: 'include'
        })
        return res;
    }
    const removeSong = async() => {
        const res = await fetch('https://localhost:3000/user/song', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(song),
            credentials: 'include'
        })
        return res;
    }

    const clickHandler = async () => {
        try{
            setLoading(true);
            let res = null;
            if(!liked){
                res = await addSong();
            }
            else{
                res = await removeSong();
            }

            if (!res.ok){
                throw new Error(res.Error);
            }
            setLiked(!liked);
        }
        catch (err){
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <IconButton onClick={clickHandler} sx={{color: 'white'}} loading={loading}>
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
        </IconButton>
  );
}

export default LikeButton;