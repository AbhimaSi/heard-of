import { useState, useCallback } from 'react'
import './App.css'
import Header from './Header.jsx'
import Content from './Content.jsx'
const [ SearchResult, UserProfile ] = Content
import Footer from './Footer.jsx'
import ListContext from '../contexts/List.jsx'
import LoadContext from '../contexts/Loading.jsx'
import ErrorContext from '../contexts/Error.jsx'
import AuthContext from '../contexts/Auth.jsx'
import ContentContext from '../contexts/Content.jsx'

function App() {
  const [ auth, setAuth ] = useState(false);
  const [list, setList] = useState([]);
  const [error, setError] = useState([]);
  const [loadState, setLoadState] = useState(false);
  const [contentWindow, setContentWindow] = useState(<SearchResult />);

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

  const verifyToken = async () => {
    const res = await fetch('http://localhost:3000/auth', {
      method: 'GET',
      credentials: 'include',
    })
    if(!res.ok){
      setAuth(false);
      console.log('Unauthorized');
      return // unauthorized
    }
    console.log('Authorized');
    return setAuth(true);
  }
  verifyToken();

  const renderSearch = () => {
    setContentWindow(<SearchResult />)
  }
  const renderProfile = () => {
    setContentWindow(<UserProfile />)
  }

  return (
    <>
      <ErrorContext.Provider value={{error, addError, delError}}>
        <AuthContext.Provider value={{auth, verifyToken}}>
          <LoadContext.Provider value={{loadState, setLoadState}}>
            <ListContext.Provider value={{list, setList}}>
              <ContentContext.Provider value={{renderSearch, renderProfile}}>
                <Header />
                {contentWindow}
                <Footer />
              </ContentContext.Provider>
            </ListContext.Provider>
          </LoadContext.Provider>
        </AuthContext.Provider>
      </ErrorContext.Provider>
    </>
  )
}

export default App