import { useState, useContext } from 'react'
import AuthContext from '../contexts/Auth.jsx'
import ContentContext from '../contexts/Auth.jsx'

//import 'Header.css'
import SearchBar from './SearchBar.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import Profile from './Profile.jsx'

function Header() {
    const { auth } = useContext(AuthContext);

    return <header className="hbox" id="header">
        <h1>HeardOf</h1>
        <SearchBar/>
        <Login display={!auth ? 'inline-flex' : 'none' }/>
        <Register display={!auth ? 'inline-flex' : 'none'}/>
        <Profile display = {auth ? 'inline-flex' : 'none'}/>
    </header>
}

export default Header
