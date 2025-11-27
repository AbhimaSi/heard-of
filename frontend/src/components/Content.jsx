import { useContext } from 'react'
import { Grid } from '@mui/material'
import ListContext from '../contexts/List'
import LoadContext from '../contexts/Loading'
import ErrorContext from '../contexts/Error'
import Item from './Item'
import Loading from './Loading'
import Error from './Error'

function Content(){
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

export default Content