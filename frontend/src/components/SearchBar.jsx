import { useState, useContext, useEffect, useRef } from 'react';
import ListContext from '../contexts/List';
import LoadContext from '../contexts/Loading';
import ErrorContext from '../contexts/Error';
import ContentContext from '../contexts/Content';
import { TextField, FormControl, FormHelperText } from '@mui/material';

const httpRequest = async(query) => {
    try{
        /* Error Thrower
        if(Math.random() >= 0.5){
            throw new Error('ForcedError.');
        }
        */

        // HTTP REQUEST to BACKEND
        console.log(query)
        const res = await fetch(`https://localhost:3000/song/${query}`, { method: "GET" });
        if (!res.ok){
            throw new Error(`Failed: ${res.status}. Error on trying to request from Proxy/API.`);
        }

        const data = await res.json();
        return data;
    }
    catch(err){
        throw err;
    }
}

function SearchBar(){
    const { renderSearch, renderProfile } = useContext(ContentContext);
    const   [ input, setInput ] = useState(''),
            [ requisitionState, setRequisitionState ] = useState(null);

    const   { setList } = useContext(ListContext),
            { loadState, setLoadState } = useContext(LoadContext),
            { error, addError, delError } = useContext(ErrorContext);

    const change = (ev) => { setInput(ev.target.value) };

    let try_counter = useRef(0);
    useEffect(()=>{
        if (requisitionState === "ongoing"){
            let timer_id = setInterval(async () => {
                if(!loadState) setLoadState(true);
                try{
                    const data = await httpRequest(input);
                    setList(data);
                    setLoadState(false);
                    setRequisitionState(null);
                    delError("DiveAPIFetch");
                }
                catch(err){
                    let message = `${err.message} Trying again in 5s.`
                    console.log(message);

                    if (try_counter.current >= 1)
                        message = message.concat(` (${try_counter.current})`);

                    try_counter.current += 1;
                    addError({origin: "DiveAPIFetch", error: new Error(message)});
                }
            }, 5000);

            return () => {
                console.log("Interval cleanse");
                clearInterval(timer_id);
            }
        }
    }, [requisitionState, addError, delError])

    const keyDown = async (ev) => {
        if(ev.keyCode == 13){
            try{
                renderSearch()
                if (input.length == 0)
                    throw new Error("Input must include a song name.")
                else
                    delError("SearchBarInput");

                setLoadState(true);
                try_counter.current = 0;
                setRequisitionState("ongoing");
            }
            catch(err){
                addError({origin: "SearchBarInput", error: err})
            }
        }
    }

    const button_sx = {
        backgroundColor:"#f7f7f7ff",
        color: "#2c2736",
        width: "100px"
    }
    const input_sx = {
        '& .MuiInputBase-input.MuiOutlinedInput-input': { color: "white" },
        width: "100%",
        marginLeft: "15px"
    }

    const searchError = (() => {
        if(error) return error.find(err => err.origin === "SearchBarInput") || null
    })()
    
    return (
        <div id="search_bar">
            <FormControl error={searchError ? true : false} fullWidth>
                <TextField 
                    variant="outlined" 
                    value={input} 
                    sx={input_sx} 
                    placeholder="Type a song name. (e.g.: Everlong, Like a Stone, Given Up...)" 
                    onChange={change} 
                    onKeyDown={keyDown} 
                />
                <FormHelperText sx={{'& .MuiFormHelperText-root' : {
                    position : 'absolute',
                    bottom : '-1rem'
                }}}
                error={true}>{searchError ? searchError.error.message : null}</FormHelperText>
            </FormControl>
        </div>
    )
}

export default SearchBar