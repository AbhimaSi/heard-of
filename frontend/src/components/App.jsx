import { useState, useCallback } from 'react'
import './App.css'
import Header from './Header.jsx'
import Content from './Content.jsx'
import Footer from './Footer.jsx'
import ListContext from '../contexts/List.jsx'
import LoadContext from '../contexts/Loading.jsx'
import ErrorContext from '../contexts/Error.jsx'

function App() {
  const [list, setList] = useState([]);
  const [error, setError] = useState([]);
  const [loadState, setLoadState] = useState(false);

  const addError = useCallback((error_obj) => {
    const { origin } = error_obj;
    let error_list = [];
    setError(errorDict => {
      if (errorDict)
        error_list = errorDict.filter((error) => error.origin !== origin );

      return [...error_list, { origin: origin, error: error_obj.error }]

    })

  }, []);

  const delError = useCallback(({ origin }) => {
    let error_list = [];
    setError(errorDict => {
      if (errorDict)
        error_list =  errorDict.filter((error) => error.origin !== origin);

      if (error_list < errorDict)
        return error_list;
      else
        return

    })
  }, []);

  return (
    <>
      <ErrorContext.Provider value={{error, addError, delError}}>
        <LoadContext.Provider value={{loadState, setLoadState}}>
          <ListContext.Provider value={{list, setList}}>
            <Header />
            <Content />
            <Footer />
          </ListContext.Provider>
        </LoadContext.Provider>
      </ErrorContext.Provider>
    </>
  )
}

export default App