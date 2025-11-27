import { useState, useContext, useEffect, useRef } from 'react';
import ListContext from '../contexts/List';
import LoadContext from '../contexts/Loading';
import ErrorContext from '../contexts/Error';
import { TextField, FormControl, FormHelperText } from '@mui/material';

const httpRequest = async(query) => {
    // QUERY Placeholder
    const artista = query;
    const musica = query;
    const URI = "https://tastedive.com/api/similar"
                +`?q=music:${encodeURI(query)}`
                +"&type=music"
                +"&info=1"
                +"&limit=10"
                +"&slimit=3"
                +"&k=1060212-HeardOf-8673E0A3"
    const proxy = "https://corsproxy.io/?url=";
    try{
        /* Random Error Thrower
        if(Math.random() >= 0.5){
            throw new Error('ForcedError.');
        }
        */
        // HTTP REQUEST to DIVE API
        const res = await fetch(proxy + encodeURI(URI));
        if (res.ok){
            const data = await res.json();
            console.log(data);
            return data.similar.results;
        }
        else
            throw new Error(`Failed: ${res.status}. Error on trying to request from Proxy/API.`);
    }
    catch(err){
        throw err;
    }
}

function SearchBar(){
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
                if (input.length == 0)
                    throw new Error("Input must include an artist name.")
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
                    placeholder="Type a musical artist. (e.g.: Anri, Draft Punk, Nirvana...)" 
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