import { useContext, useState, useEffect } from 'react'
import { Grid, Avatar } from '@mui/material'
import ListContext from '../contexts/List'
import LoadContext from '../contexts/Loading'
import ErrorContext from '../contexts/Error'
import Item from './Item'
import Loading from './Loading'
import Error from './Error'

function SearchResult({ show }){
    const { list } = useContext(ListContext)
    const contentList = list.map((itemObj, idx) => (
        <Item
            name={itemObj.name}
            yID={itemObj.yID}
            key={idx}
        />
    ))
    
    const { loadState } = useContext(LoadContext);

    const { error } = useContext(ErrorContext);
    // Função anônima. Se auto-chama para verificar se há erros.
    // Procura pela existência do erro de origem DiveAPIFetch.
    const fetchError = (() => {
        if(error) return error.find(err => err.origin === "DiveAPIFetch") || null
    })()

    return (
        <main className='list' id='content'>
            <div id="load" className={loadState ? "visible" : "hidden"}>
                <Loading id="loading">Loading...</Loading>
                <Error className={fetchError ? "visible" : "hidden"} id="error">
                        {fetchError ? fetchError.error.message : null}
                </Error>
            </div>
            <Grid sx={{
                display: loadState ? "none" : "block"
            }}
        ><ul>{contentList}</ul></Grid>
        </main>
    )
}

import Profile from './Profile'
function UserProfile({ show }){
    const [ user, setUser ] = useState(undefined);

    const fetchUser = async () => {
        const res = await fetch('http://localhost:3000/user', { method: 'GET', credentials: 'include' })
        if (!res.ok){
            console.log('Failed to fetch.');
        }
        return await res.json();
    }

    useEffect(()=>{
        const fetchUserData = async () => {
            try{
                const user = await fetchUser();
                console.log(user)
                setUser(user);
            }
            catch(err){
                console.log(err)
            }
        }
        fetchUserData();
    }, []);

    if (!user){
        return (
            <div>Loading profile</div>
        )
    }

    console.log(user);

    let songs = user.songs || [];

    songs = songs ? songs.map((song, idx) => {
        return <Item
            name={song.name}
            yID={song.yID}
            key={idx}
        />
    }) : []

    return (
        <main className='list' id='profile'>
            <Avatar
                sx={{
                    backgroundColor:'darkmagenta',
                    width: '100px',
                    height: '100px',
                }}
            >U</Avatar>
            <span>{user.name}</span>
            <Grid sx={{
                display: show ? "none" : "block"
            }}
            ><ul>{songs ? songs : []}</ul></Grid>
        </main>
    )
}

export default [
    SearchResult,
    UserProfile,
]